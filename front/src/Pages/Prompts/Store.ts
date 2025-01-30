import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import EditPromptStore from './EditPrompt/Store.ts';
import EditCategoryStore from './EditCategory/Store.ts';
import dialogStore from '@/Common/Confirmation/Store.ts';
import axios from 'axios';
import _ from 'lodash';

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
 editPromptModal = new EditPromptStore();

 @observable
 editCategoryModal = new EditCategoryStore();

 @observable
 searchTerm = '';

 @observable
 categories: Array<Category> = [];

 constructor() {
  super();
  makeObservable(this);
  this.editPromptModal.onSave = this.onPromptSave;
  this.editCategoryModal.onSave = this.onCategorySave;
 }

 name = 'Prompts';
 icon = 'discuss-fill';
 url = '/prompts';

 editPrompt = (item: Prompt) => {
  this.editPromptModal.prompt = { ...item };
  this.editPromptModal.show();
 };

 addPrompt = (categoryId: number) => {
  this.editPromptModal.prompt = { categoryId: categoryId } as any;
  this.editPromptModal.show();
 };

 onPromptSave = () => {
  let newItem = this.editPromptModal.prompt;
  let category = this.categories.find((x) => x.id == newItem.categoryId)!;
  let prompts = category.prompts;
  let current = prompts.find((x) => x.id == newItem.id)!;
  if (current) {
   Object.assign(current, newItem);
  } else {
   prompts.push(newItem);
  }
  category.prompts = _(prompts)
   .orderBy((x) => x.name)
   .value();
 };

 onCategorySave = () => {
  let newItem = this.editCategoryModal.category;
  let current = this.categories.find((x) => x.id == newItem.id);
  if (current) {
   current.name = newItem.name;
  } else {
   this.categories.push({
    ...newItem,
    prompts: [],
   });
  }
  this.categories = _(this.categories)
   .orderBy((x) => x.name)
   .value();
 };

 deletePrompt = async (promptId: number, name: string, categoryId: number) => {
  const result = await dialogStore.confirm(
   `Do you want to delete this item: #${promptId} "${name}"?`,
  );
  if (!result) return;
  await axios.delete(`/prompts/${promptId}`);
  const category = this.categories.find((c) => c.id === categoryId)!;
  category.prompts = category.prompts.filter((p) => p.id !== promptId);
 };

 addCategory = async () => {
  this.editCategoryModal.category = {} as any;
  this.editCategoryModal.show();
 };

 editCategory = async (category: Category) => {
  this.editCategoryModal.category = { ...category };
  this.editCategoryModal.show();
 };

 deleteCategory = async (categoryId: number) => {
  const result = await dialogStore.confirm(
   `Do you want to delete the category with ID: ${categoryId}?`,
  );
  if (!result) return;

  await axios.delete(`/categories/${categoryId}`);
  this.categories = this.categories.filter((c) => c.id !== categoryId);
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
