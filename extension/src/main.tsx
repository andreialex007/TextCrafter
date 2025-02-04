import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./content.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";

document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "s") {
    const selectedText = window.getSelection()?.toString() || "";
    if (selectedText) {
      store.setSelectedText(selectedText);
      store.togglePanel(true);
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
