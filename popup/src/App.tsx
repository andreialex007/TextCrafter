import { useEffect } from "react";
import { observer } from "mobx-react-lite";
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
      <div className="flex w-full shadow-md bg-yellow-50 ">
        <span className="flex-grow flex gap-2 px-4 py-3 ">
          <i className="ri-home-fill"></i>
          <span>Text Crafter</span>
        </span>
        <span
          onClick={() => AuthStore.logout(false)}
          className="px-4 py-3 bg-gray-100 cursor-pointer hover:opacity-60 text-gray-500"
        >
          Logout <i className="ri-close-circle-fill"></i>
        </span>
      </div>
      <div className="p-4 w-fit rounded bg-gray-200">Test</div>
      <h1 className="text-xl font-bold">Selected Text</h1>
      <p className="mt-2">{store.selectedText}</p>
    </div>
  );
}

export default observer(App);
