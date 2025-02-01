import { makeAutoObservable, makeObservable, observable } from 'mobx';

export default class Store {
 @observable
 isOpen: boolean = false;

 @observable
 activeTab: number = 0;

 @observable
 elements: Array<string> = [
  'first text, very long text, super long text',
  'second text, very long text, super long text',
  'third text, very long text, super long text',
 ];

 constructor() {
  makeObservable(this);
 }

 // Action to change the active tab
 setActiveTab(index: number) {
  this.activeTab = index;
 }
}
