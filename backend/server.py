from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# ---------------------------------------------------------------------------
# Booking leads — /api/leads
# ---------------------------------------------------------------------------
PHONE_RE = re.compile(r"^\+?[\d\s()\-]{7,20}$")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]{2,}$")

CONTACT_METHODS = {"phone", "telegram", "viber", "email"}


class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=7, max_length=20)
    email: Optional[str] = Field(default=None, max_length=120)
    contact_method: str = Field(default="phone")
    complaint: str = Field(min_length=5, max_length=2000)
    duration: Optional[str] = Field(default=None, max_length=60)
    preferred_time: Optional[str] = Field(default=None, max_length=200)
    consent: bool
    company: str = ""  # honeypot — must stay empty
    source_page: Optional[str] = Field(default=None, max_length=200)
    utm: Optional[Dict[str, str]] = None

    @field_validator("name")
    @classmethod
    def name_not_blank(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Вкажіть ім'я (щонайменше 2 символи).")
        return v

    @field_validator("phone")
    @classmethod
    def phone_format(cls, v: str) -> str:
        v = v.strip()
        if not PHONE_RE.match(v):
            raise ValueError("Вкажіть коректний номер телефону.")
        return v

    @field_validator("email")
    @classmethod
    def email_format(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == "":
            return None
        v = v.strip()
        if not EMAIL_RE.match(v):
            raise ValueError("Вкажіть коректну електронну адресу.")
        return v

    @field_validator("contact_method")
    @classmethod
    def method_allowed(cls, v: str) -> str:
        if v not in CONTACT_METHODS:
            raise ValueError("Оберіть спосіб зв'язку зі списку.")
        return v

    @field_validator("consent")
    @classmethod
    def consent_required(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Потрібна згода на обробку персональних даних.")
        return v

    @field_validator("utm")
    @classmethod
    def utm_trim(cls, v: Optional[Dict[str, str]]) -> Optional[Dict[str, str]]:
        if not v:
            return None
        allowed = {"utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"}
        return {k: str(val)[:120] for k, val in v.items() if k in allowed} or None


class LeadResponse(BaseModel):
    ok: bool
    id: Optional[str] = None
    message: str


@api_router.post("/leads", response_model=LeadResponse)
async def create_lead(lead: LeadCreate, request: Request):
    # Honeypot: silently accept but do not store (bot traffic)
    if lead.company.strip():
        logger.info("lead rejected: honeypot filled")
        return LeadResponse(ok=True, id=None, message="Заявку отримано.")

    doc = lead.model_dump(exclude={"company"})
    doc["id"] = str(uuid.uuid4())
    doc["status"] = "new"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()

    try:
        await db.leads.insert_one(dict(doc))
    except Exception:
        logger.exception("lead storage failed (id=%s)", doc["id"])
        raise HTTPException(
            status_code=500,
            detail="Не вдалося зберегти заявку. Спробуйте, будь ласка, ще раз.",
        )

    # Health-safe logging: never log complaint text or contact details
    logger.info("lead stored id=%s source=%s method=%s", doc["id"], doc.get("source_page"), doc["contact_method"])
    return LeadResponse(
        ok=True,
        id=doc["id"],
        message="Заявку отримано. Я особисто відповім протягом одного робочого дня.",
    )

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()