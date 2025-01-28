import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import ItemEditStore from './Edit/Store.ts';
import axios from 'axios';

export type Category = {
 id: number;
 name: string;
 description?: string;
 prompts: Prompt[];
};

export type Prompt = {
 id: number;
 name: string;
 categoryId?: number;
 content: string;
};

export default class Store extends NavItem {
 @observable
 loading = false;

 @observable
 edit = new ItemEditStore();

 @observable
 searchTerm = '';

 @observable
 categories: Array<Category> = [];

 constructor() {
  super();
  makeObservable(this);
 }

 name = 'Prompts';
 icon = 'discuss-fill';
 url = '/prompts';

 editPrompt = (item: Prompt) => {
  this.edit.prompt = { ...item };
  this.edit.openModal();
 };

 get filteredCategories() {
  return this.filterCategories(this.categories);
 }

 load = async () => {
  let resp = await axios.get<Array<Category>>('/categories/');
  this.categories = resp.data;
 };

 filterCategories = (categories: Array<Category>) => {
  return categories.filter(
   (x) =>
    x.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    this.filterPrompts(x.prompts).some((x) => x),
  );
 };

 filterPrompts = (prompts: Array<Prompt>) => {
  return prompts.filter(
   (x) =>
    x.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    x.content.toLowerCase().includes(this.searchTerm.toLowerCase()),
  );
 };
}
