import { observer } from "mobx-react-lite";
import { store } from "../store/store.ts";
import "remixicon/fonts/remixicon.css";
import Prompts from "../../../front/src/Pages/Prompts/Prompts";
import {
  getChromeItem,
  getLocalItem,
  initAxios,
  isChromeStorageAvailable,
  setLocalItem,
} from "../../../front/src/Common/Utils.ts";
import authStore from "../../../front/src/Common/AuthStore.ts";
import LoginForm from "../../../front/src/Pages/Login/LoginForm.tsx";
import LoginStore from "../../../front/src/Pages/Login/Store.ts";
import React from "react";

initAxios("http://127.0.0.1:8055");

if (isChromeStorageAvailable()) {
  getChromeItem<string>("token").then((value) => {
    if (value) {
      setLocalItem<string>("token", value);
      authStore.refresh();
      store.isLoaded = true;
    }
  });
} else {
  authStore.refresh();
  store.isLoaded = true;
}

const Panel = observer(() => {
  if (!store.isLoaded) return;

  if (!store.isPanelVisible) return null;

  if (!authStore.isAuthenticated) {
    return (
      <div id="text-selection-extension-root">
        <div className="flex fixed bottom-0 p-2 w-full flex-col justify-center items-center">
          <div className="flex relative flex-col items-center w-[300px]">
            <LoginForm />
            <span
              onClick={async () => {
                await LoginStore.handleLogin();
                await chrome.storage.local.set({
                  token: getLocalItem<string>("token"),
                });
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
    <div id="text-selection-extension-root">
      <Prompts store={store.prompts} />
    </div>
  );
});

export default Panel;
