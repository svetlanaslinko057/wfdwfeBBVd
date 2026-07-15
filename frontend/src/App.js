import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import HomePage from "@/pages/HomePage";
import PlaceholderPage from "@/pages/PlaceholderPage";

function App() {
  return (
    <div className="App min-h-screen bg-[hsl(var(--bone))]">
      <BrowserRouter>
        <a href="#main" className="skip-link">
          Перейти до вмісту
        </a>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/approach"
            element={
              <PlaceholderPage
                index="02"
                title="Підхід"
                note="Оцінка → тест → лікування → повторний тест. Повний розділ методики зараз калібрується."
              />
            }
          />
          <Route
            path="/conditions"
            element={
              <PlaceholderPage
                index="05"
                title="Стани"
                note="Навігатор по зонах тіла калібрується. Він з'явиться в наступній фазі."
              />
            }
          />
          <Route
            path="/about"
            element={
              <PlaceholderPage
                index="07"
                title="Про мене"
                note="Розділ про спеціаліста калібрується. Він з'явиться в наступній фазі."
              />
            }
          />
          <Route
            path="/booking"
            element={
              <PlaceholderPage
                index="09"
                title="Почніть із діагностики"
                note="Протокол запису калібрується. Він з'явиться в наступній фазі."
              />
            }
          />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
