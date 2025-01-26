import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import ItemEditStore from './Edit/Store.ts';
import ItemsListStore from './List/Store.ts';

export default class Store extends NavItem {
 @observable
 loading = false;

 edit = new ItemEditStore();
 list = new ItemsListStore();

 constructor() {
  super();
  makeObservable(this);
 }

 name = 'Prompts';
 icon = 'discuss-fill';
 url = '/prompts';
}
