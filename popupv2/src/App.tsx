import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./App.css";
import store from "./store";

function App() {
  useEffect(() => {
    try {
      chrome.storage.local.get("selectedText", (result) => {
        store.setSelectedText(result.selectedText || "");
      });
    } catch (e) {
      store.selectedText = "my custom selected text";
    }
  }, []);

  return (
    <div className="flex flex-col">
      <i className="ri-user-fill"></i>
      <div className="p-4 w-fit rounded bg-gray-200">Test</div>
      <h1 className="text-xl font-bold">Selected Text</h1>
      <p className="mt-2">{store.selectedText}</p>
    </div>
  );
}

export default observer(App);
