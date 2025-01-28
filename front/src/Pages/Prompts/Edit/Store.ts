import { makeAutoObservable, makeObservable, observable } from 'mobx';
import type { Prompt } from '@/Pages/Prompts/Store.ts';

export default class Store {
 @observable
 isOpen: boolean = false;

 @observable
 prompt: Prompt = {} as any;

 constructor() {
  makeObservable(this);
 }

 openModal = () => {
  this.isOpen = true;
 };

 closeModal = () => {
  this.isOpen = false;
  this.prompt = {} as any;
 };
}
