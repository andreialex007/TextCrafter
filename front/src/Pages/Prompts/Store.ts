import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import EditPromptStore from './EditPrompt/Store.ts';
import EditCategoryStore from './EditCategory/Store.ts';
import dialogStore from './../../Common/Confirmation/Store.ts';
import axios from 'axios';

import ResultViewStore from './ResultView/Store';
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
 selected: boolean;
};

export default class Store extends NavItem {
 @observable
 loading = false;

 @observable
 editPromptModal = new EditPromptStore();

 @observable
 editCategoryModal = new EditCategoryStore();

 @observable
 resultViewStore = new ResultViewStore();

 @observable
 searchTerm = '';

 @observable
 textExample = '';

 @observable
 dragId: number = 0;

 @observable
 categories: Array<Category> = [];

 constructor() {
  super();
  makeObservable(this);
  this.editPromptModal.onSave = this.onPromptSave;
  this.editCategoryModal.onSave = this.onCategorySave;
  this.resultViewStore.onApply = this.onApplyPrompt;
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

 onApplyPrompt = () => {
  let promptText = this.resultViewStore.selectedPromptText;
  this.textExample = promptText;
  this.onPromptApplied(promptText);
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

 clickPrompt = async (prompt: Prompt) => {
  this.resultViewStore.prompt = prompt;
  this.resultViewStore.load(this.textExample);
 };

 selectByEnterPrompt = async () => {
  let selected = this.visiblePrompts.find((x) => x.selected);
  if (!selected) return;
  this.resultViewStore.prompt = selected;
  this.resultViewStore.load(this.textExample);
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
  resp.data.forEach((c) => c.prompts.forEach((x) => (x.selected = false)));
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

 onDrop = async (dropId: number) => {
  let itemToDrag = this.categories
   .flatMap((x) => x.prompts)
   .find((x) => x.id === this.dragId)!;
  let categoryToDrop = this.categories.find((x) => x.id === dropId)!;
  let sourceCategory = this.categories.find((x) =>
   x.prompts.some((p) => p.id === this.dragId),
  )!;
  if (sourceCategory.id === categoryToDrop.id) return;

  sourceCategory.prompts = sourceCategory.prompts.filter((p) => p.id !== itemToDrag.id);
  const updatedPrompt = {
   ...itemToDrag,
   categoryId: categoryToDrop.id,
  };
  categoryToDrop.prompts.push(updatedPrompt);

  categoryToDrop.prompts = _(categoryToDrop.prompts)
   .orderBy((x) => x.name)
   .value();

  await axios.put(`/prompts/${itemToDrag.id}`, updatedPrompt);
 };

 get visiblePrompts(): Array<Prompt> {
  return this.categories.flatMap((category) =>
   category.prompts.filter(
    (prompt) =>
     prompt.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
     prompt.content.toLowerCase().includes(this.searchTerm.toLowerCase()),
   ),
  );
 }

 deselectAllPrompts = () => {
  this.categories.forEach((category) => {
   category.prompts.forEach((prompt) => {
    prompt.selected = false;
   });
  });
 };

 selectPrompt = (promptId: number) => {
  if (!this.visiblePrompts.some((prompt) => prompt.id === promptId)) return; // Ensure the prompt is visible

  this.deselectAllPrompts();

  const selectedPrompt = this.visiblePrompts.find((prompt) => prompt.id === promptId);
  if (selectedPrompt) {
   selectedPrompt.selected = true;
  }
 };

 moveSelectionUp = () => {
  const visiblePrompts = this.visiblePrompts;
  const currentIndex = visiblePrompts.findIndex((prompt) => prompt.selected);

  if (currentIndex <= 0) return;
  this.deselectAllPrompts();
  visiblePrompts[currentIndex - 1].selected = true;
 };

 moveSelectionDown = () => {
  const visiblePrompts = this.visiblePrompts;
  const currentIndex = visiblePrompts.findIndex((prompt) => prompt.selected);

  if (currentIndex >= visiblePrompts.length - 1) return;
  this.deselectAllPrompts();
  visiblePrompts[currentIndex + 1].selected = true;
 };

 onPromptApplied = (prompt: string) => {};
}
