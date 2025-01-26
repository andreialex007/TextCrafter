import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import ItemEditStore from './Edit/Store.ts';

type Category = {
 id: number;
 name: string;
 description?: string;
 prompts: Prompt[];
};

type Prompt = {
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
 categories: Array<Category> = [
  {
   id: 5,
   name: 'first item',
   description: 'first item description',
   prompts: [
    {
     id: 1,
     name: 'first prompt',
     content: 'first prompt content',
    },
    {
     id: 2,
     name: 'first prompt',
     content: 'first prompt content',
    },
   ],
  },
  {
   id: 6,
   name: 'second item',
   description: 'second item description',
   prompts: [
    {
     id: 3,
     name: 'second prompt',
     content: 'second prompt content',
    },
    {
     id: 4,
     name: 'second prompt',
     content: 'third prompt content',
    },
   ],
  },
 ];

 constructor() {
  super();
  makeObservable(this);
 }

 name = 'Prompts';
 icon = 'discuss-fill';
 url = '/prompts';

 get filteredCategories() {
  return this.filterCategories(this.categories);
 }

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
