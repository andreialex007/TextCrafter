import React from "react";
import ReactDOM from "react-dom/client";
import Panel from "./components/Panel";
import { selectionStore } from "./store/selectionStore";
import "./index.css";

// Create container for the panel
const container = document.createElement("div");
document.body.appendChild(container);
const root = ReactDOM.createRoot(container);

// Render the panel
root.render(
  <React.StrictMode>
    <Panel />
  </React.StrictMode>,
);

// Listen for Alt+S keyboard shortcut
document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "s") {
    const selectedText = window.getSelection()?.toString() || "";
    if (selectedText) {
      selectionStore.setSelectedText(selectedText);
      selectionStore.togglePanel(true);
    }
  }
});
