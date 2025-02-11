import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./index.css";
import "./App.css";
import store from "./store";
import Prompts from "../../front/src/Pages/Prompts/Prompts";
import {
  getChromeItem,
  getLocalItem,
  initAxios,
  isChromeStorageAvailable,
  setLocalItem,
} from "../../front/src/Common/Utils.ts";
import authStore from "../../front/src/Common/AuthStore.ts";
import LoginForm from "../../front/src/Pages/Login/LoginForm.tsx";
import LoginStore from "../../front/src/Pages/Login/Store.ts";
import AuthStore from "../../front/src/Common/AuthStore.ts";

initAxios("http://127.0.0.1:8055");
authStore.refresh();

store.prompts.onPromptApplied = (prompt: string) => {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (!tabId) return;
      chrome.tabs.sendMessage(tabId, {
        type: "APPLY_PROMPT",
        prompt: prompt,
      });
      window.close();
    });
  } catch (e) {
    console.log("prompt applied = ", prompt);
  }
};

function App() {
  useEffect(() => {
    try {
      chrome.storage.local.get("selectedText", (result) => {
        store.setSelectedText(result.selectedText || "");
      });
    } catch (e) {
      store.setSelectedText(
        "A smartphone is a mobile device that combines the functionality of a traditional mobile phone with advanced computing capabilities. It typically has a touchscreen interface, allowing users to access a wide range of applications and services, such as web browsing, email, and social media, as well as multimedia playback and streaming. Smartphones have built-in cameras, GPS navigation, and support for various communication methods, including voice calls, text messaging, and internet-based messaging apps.\n\nSmartphones are distinguished from older-design feature phones by their more advanced hardware capabilities and extensive mobile operating systems, access to the internet, business applications, mobile payments, and multimedia functionality, including music, video, gaming, radio, and television.",
      );
    }
  }, []);

  if (!authStore.isAuthenticated) {
    return (
      <div className="flex size-full relative flex-col items-center justify-center">
        <div className="flex p-2 w-full flex-col justify-center items-center">
          <div className="flex relative flex-col items-center w-[300px]">
            <LoginForm />
            <span
              onClick={async () => {
                await LoginStore.handleLogin();
                AuthStore.refresh();
              }}
              className="basic-btn align-center mt-3 min-w-full justify-center rounded-md bg-slate-500 p-2 px-3 text-white"
            >
              <i className="ri-login-box-fill"></i>
              Login
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col size-full">
      <div className="flex w-full shadow-md bg-yellow-50">
        <span className="flex-grow bg-slate-700 text-white flex gap-2 px-4 py-3 ">
          <i className="ri-ball-pen-fill"></i>
          <span className="italic font-bold uppercase">Text Crafter</span>
        </span>
        <span
          onClick={() => AuthStore.logout(false)}
          className="px-4 py-3 bg-gray-600 text-white cursor-pointer
          hover:opacity-90 text-gray-500"
        >
          Logout <i className="ri-close-circle-fill"></i>
        </span>
      </div>
      <Prompts store={store.prompts} />
    </div>
  );
}

export default observer(App);
