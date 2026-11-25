import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./app/GlobalStyle.tsx";
import App from "./App.tsx";

const queryClient = new QueryClient();

if (!localStorage.getItem("atptCode")) {
  localStorage.setItem("atptCode", "G10");
}
if (!localStorage.getItem("schoolCode")) {
  localStorage.setItem("schoolCode", "7430310");
}
if (!localStorage.getItem("grade")) {
  localStorage.setItem("grade", "2");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
