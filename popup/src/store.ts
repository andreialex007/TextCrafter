import { makeAutoObservable } from "mobx";

class ExtensionStore {
  selectedText = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedText(text: string) {
    this.selectedText = text;
  }
}

export default new ExtensionStore();
