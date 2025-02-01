import { computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import type { Prompt } from '@/Pages/Prompts/Store.ts';

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
 elements: Array<string> = [
  'first text, very long text, super long text',
  'second text, very long text, super long text',
  'third text, very long text, super long text',
 ];

 constructor() {
  makeObservable(this);
 }

 setActiveTab(index: number) {
  this.activeTab = index;
 }

 @computed
 get selectedPromptText() {
  return this.elements[this.activeTab];
 }

 goBack = () => {
  this.prompt = {} as any;
 };

 apply = () => {
  console.log('applying...');
  this.onApply();
 };
}
