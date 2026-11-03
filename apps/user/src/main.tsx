import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "./app/GlobalStyle.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
);
