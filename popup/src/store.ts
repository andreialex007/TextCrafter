import { makeAutoObservable, makeObservable } from "mobx";
import PromptStore from "./../../front/src/Pages/Prompts/Store.ts";

class ExtensionStore {
  prompts: PromptStore = new PromptStore();

  constructor() {
    makeObservable(this);
  }

  setSelectedText(text: string) {
    this.prompts.textExample = text;
  }
}

export default new ExtensionStore();
