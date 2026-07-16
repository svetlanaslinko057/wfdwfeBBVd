import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import HomePage from "@/pages/HomePage";
import ApproachPage from "@/pages/ApproachPage";
import ConditionsPage from "@/pages/ConditionsPage";
import ConditionRegionPage from "@/pages/ConditionRegionPage";
import AboutPage from "@/pages/AboutPage";
import BookingPage from "@/pages/BookingPage";
import PrivacyPage from "@/pages/PrivacyPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import { ScrollTrigger } from "@/lib/gsapSetup";

// Скрол вгору при зміні маршруту + оновлення ScrollTrigger після навігації.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Перерахунок тригерів після зміни висоти сторінки
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App min-h-screen bg-[hsl(var(--bone))]">
      <BrowserRouter>
        <ScrollToTop />
        <a href="#main" className="skip-link">
          Перейти до вмісту
        </a>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/approach" element={<ApproachPage />} />
          <Route path="/conditions" element={<ConditionsPage />} />
          <Route path="/conditions/:region" element={<ConditionRegionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route
            path="*"
            element={
              <PlaceholderPage
                index="404"
                title="Ця сторінка втратила вирівнювання."
                note="Адреса не відповідає жодному відомому шляху."
              />
            }
          />
        </Routes>
        <SiteFooter />
        <Toaster position="top-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
