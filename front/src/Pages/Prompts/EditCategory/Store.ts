import { makeObservable, observable } from 'mobx';
import type { Category, Prompt } from '@/Pages/Prompts/Store.ts';
import axios from 'axios';

export default class Store {
 @observable
 isOpen: boolean = false;

 @observable
 category: Category = {} as any;

 constructor() {
  makeObservable(this);
 }

 show = () => {
  this.isOpen = true;
 };

 closeModal = () => {
  this.isOpen = false;
  this.category = {} as any;
 };

 saveCategory = async () => {
  let url = `/categories/${!this.category.id ? '' : this.category.id}`;
  let resp = await axios[this.category.id ? 'put' : 'post'](url, this.category);
  this.category = resp.data as Category;
  this.onSave();
  this.closeModal();
 };

 onSave = () => {};
}
