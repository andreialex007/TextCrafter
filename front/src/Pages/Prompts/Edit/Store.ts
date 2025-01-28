import { makeAutoObservable, makeObservable, observable } from 'mobx';
import type { Prompt } from '@/Pages/Prompts/Store.ts';
import axios from 'axios';

export default class Store {
 @observable
 isOpen: boolean = false;

 @observable
 prompt: Prompt = {} as any;

 constructor() {
  makeObservable(this);
 }

 show = () => {
  this.isOpen = true;
 };

 closeModal = () => {
  this.isOpen = false;
  this.prompt = {} as any;
 };

 savePrompt = async () => {
  let url = `/prompts/${!this.prompt.id ? '' : this.prompt.id}`;
  let resp = await axios[this.prompt.id ? 'put' : 'post'](url, this.prompt);
  this.prompt = resp.data as Prompt;
  this.onSave();
  this.closeModal();
 };

 onSave = () => {};
}
