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
          Skip to content
        </a>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/approach"
            element={
              <PlaceholderPage
                index="02"
                title="Approach"
                note="Assess → test → treat → re-test. The full method chapter is being calibrated."
              />
            }
          />
          <Route
            path="/conditions"
            element={
              <PlaceholderPage
                index="05"
                title="Conditions"
                note="The body-region navigator is being calibrated. It arrives in the next phase."
              />
            }
          />
          <Route
            path="/about"
            element={
              <PlaceholderPage
                index="07"
                title="About"
                note="The specialist chapter is being calibrated. It arrives in the next phase."
              />
            }
          />
          <Route
            path="/booking"
            element={
              <PlaceholderPage
                index="09"
                title="Start with an assessment"
                note="The booking protocol is being calibrated. It arrives in the next phase."
              />
            }
          />
          <Route
            path="*"
            element={
              <PlaceholderPage
                index="404"
                title="This page lost its alignment."
                note="The address does not match any known pathway."
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
