import { makeAutoObservable } from "mobx";

class SelectionStore {
  selectedText: string = "";
  isPanelVisible: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedText(text: string) {
    this.selectedText = text;
  }

  togglePanel(visible?: boolean) {
    this.isPanelVisible = visible ?? !this.isPanelVisible;
  }
}

export const selectionStore = new SelectionStore();
