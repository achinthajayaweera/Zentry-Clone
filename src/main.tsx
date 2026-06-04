import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SmoothScrollProvider } from "./context/ScrollProviderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap entire app in SmoothScrollProvider so all components can access locoScroll */}
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>
);
