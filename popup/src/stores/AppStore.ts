import { makeAutoObservable } from "mobx";

class AppStore {
  selectedText = "";

  constructor() {
    makeAutoObservable(this);
    this.initializeSelectedText();
  }

  initializeSelectedText() {
    if (chrome.storage) {
      chrome.storage.local.get(["selectedText"], (result) => {
        if (result.selectedText) {
          this.setSelectedText(result.selectedText);
        }
      });
    }
  }

  setSelectedText(text: string) {
    this.selectedText = text;
  }
}

export const appStore = new AppStore();
