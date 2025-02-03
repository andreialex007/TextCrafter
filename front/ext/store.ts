import { makeObservable, observable } from 'mobx';
import PromptsStore from '../src/Pages/Prompts/Store.ts';

class PanelStore {
 @observable
 isOpen = true;

 prompts: PromptsStore = new PromptsStore();

 @observable
 selectedText = '';

 constructor() {
  makeObservable(this);
 }

 togglePanel(text?: string) {
  this.isOpen = !this.isOpen;
  if (text) this.selectedText = text;
 }
}

export const store = new PanelStore();
