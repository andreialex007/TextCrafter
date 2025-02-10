import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "./store";

function App() {
  useEffect(() => {
    chrome.storage.local.get("selectedText", (result) => {
      store.setSelectedText(result.selectedText || "");
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Selected Text</h1>
      <p className="mt-2">{store.selectedText}</p>
    </div>
  );
}

export default observer(App);
