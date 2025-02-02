import { makeObservable, observable } from 'mobx';

class PanelStore {
 @observable
 isOpen = true;

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

export const panelStore = new PanelStore();
