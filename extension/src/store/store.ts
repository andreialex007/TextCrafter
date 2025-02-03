import { makeObservable, observable } from "mobx";
import PromptStore from "./../../../front/src/Pages/Prompts/Store.ts";

class SelectionStore {
  @observable
  selectedText: string = "";
  @observable
  isPanelVisible: boolean = true;

  prompts: PromptStore = new PromptStore();

  constructor() {
    makeObservable(this);
  }

  setSelectedText(text: string) {
    this.selectedText = text;
  }

  togglePanel(visible?: boolean) {
    this.isPanelVisible = visible ?? !this.isPanelVisible;
  }
}

export const store = new SelectionStore();
