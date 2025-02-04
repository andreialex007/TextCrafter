import { makeObservable, observable } from "mobx";
import PromptStore from "./../../../front/src/Pages/Prompts/Store.ts";

class SelectionStore {
  @observable
  isPanelVisible: boolean = false;

  @observable
  isLoaded = false;

  prompts: PromptStore = new PromptStore();

  constructor() {
    makeObservable(this);
  }

  setSelectedText(text: string) {
    this.prompts.textExample = text;
  }

  togglePanel(visible?: boolean) {
    this.isPanelVisible = visible ?? !this.isPanelVisible;
  }
}

export const store = new SelectionStore();
