import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import ItemEditStore from './Edit/Store.ts';
import dialogStore from '@/Common/Confirmation/Store.ts';
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
  this.edit.onSave = this.onPromptSave;
 }

 name = 'Prompts';
 icon = 'discuss-fill';
 url = '/prompts';

 editPrompt = (item: Prompt) => {
  this.edit.prompt = { ...item };
  this.edit.show();
 };

 addPrompt = (categoryId: number) => {
  this.edit.prompt = { categoryId: categoryId } as any;
  this.edit.show();
 };

 onPromptSave = () => {
  let newItem = this.edit.prompt;
  let prompts = this.categories.find((x) => x.id == newItem.categoryId)!.prompts;
  let current = prompts.find((x) => x.id == newItem.id)!;
  if (current) {
   Object.assign(current, newItem);
  } else {
   prompts.push(newItem);
  }
 };

 get filteredCategories() {
  return this.filterCategories(this.categories);
 }

 deletePrompt = async (promptId: number, name: string, categoryId: number) => {
  const result = await dialogStore.confirm(
   `Do you want to delete this item: #${promptId} "${name}"?`,
  );
  if (!result) return;
  await axios.delete(`/prompts/${promptId}`);
  const category = this.categories.find((c) => c.id === categoryId)!;
  category.prompts = category.prompts.filter((p) => p.id !== promptId);
 };

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
