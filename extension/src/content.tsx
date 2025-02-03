import React from "react";
import ReactDOM from "react-dom/client";
import Panel from "./components/Panel";
import { store } from "./store/store.ts";
import "./content.css";

const container = document.createElement("div");
container.id = "text-selection-extension-root";
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Panel />
  </React.StrictMode>,
);

document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "s") {
    const selectedText = window.getSelection()?.toString() || "";
    if (selectedText) {
      store.setSelectedText(selectedText);
      store.togglePanel(true);
    }
  }
});
