import { makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import ItemEditStore from './Edit/Store.ts';
import axios from 'axios';

export default class Store extends NavItem {
 @observable
 loading = false;

 edit = new ItemEditStore();

 constructor() {
  super();
  makeObservable(this);
 }

 name = 'Users';
 icon = 'group-fill';
 url = '/users';
}
