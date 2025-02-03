import { computed, makeObservable, observable } from 'mobx';
import type { Prompt } from './../Store';
import axios from 'axios';

export default class Store {
 @observable
 activeTab: number = 0;

 onApply = () => {};

 @observable
 prompt: Prompt = {} as any;

 @computed
 get hasSelectedPrompt() {
  return !!this.prompt.id;
 }

 @observable
 loading = true;

 @observable
 options: Array<string> = [];

 constructor() {
  makeObservable(this);
 }

 setActiveTab(index: number) {
  this.activeTab = index;
 }

 @computed
 get selectedPromptText() {
  return this.options[this.activeTab];
 }

 async load(text: string) {
  this.loading = true;
  let resp = await axios.post<Array<string>>('/assistant/options', {
   text: text,
   promptId: this.prompt.id,
  });
  this.loading = false;
  this.options = resp.data;
 }

 goBack = () => {
  this.prompt = {} as any;
  this.activeTab = 0;
 };

 apply = () => {
  console.log('applying...');
  this.onApply();
  this.goBack();
 };
}
