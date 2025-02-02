import { action, computed, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import ItemEditStore from './Edit/Store.ts';
import axios from 'axios';
import app from '@/App.tsx';

type UserDto = {
 id?: number;
 name: string;
 email: string;
 role: string;
};

export default class Store extends NavItem {
 @observable
 loading = false;

 @observable
 edit = new ItemEditStore();

 @observable
 items: Array<UserDto> = [];

 @observable
 searchId: number | null = null;

 @observable
 searchRole = '';

 @observable
 searchEmail = '';

 @observable
 searchName = '';

 @observable
 take = 10;

 @observable
 skip = 0;

 @observable
 total = 10;

 @observable
 filtered = 0;

 timeoutId: any = undefined;

 constructor() {
  super();
  makeObservable(this);
 }

 name = 'Users';
 icon = 'group-fill';
 url = '/users';

 @action
 load = async (append: boolean = false) => {
  this.loading = true;
  this.skip = append ? this.skip + this.take : 0;
  if (!append) {
   this.items = [];
  }
  let resp = await axios.post<{ items: Array<UserDto>; total: number; filtered: number }>(
   '/users/search',
   {
    name: this.searchName,
    role: this.searchRole,
    id: this.searchId,
    email: this.searchEmail,
    take: this.take,
    skip: this.skip,
   },
  );
  let { filtered, items, total } = resp.data;
  this.filtered = filtered;
  this.items = items;
  this.total = total;
  this.loading = false;
 };

 triggerSearch = <T>(value: T) => {
  clearTimeout(this.timeoutId);
  this.timeoutId = setTimeout(() => this.load(), 300);
  return value;
 };

 @computed
 get hasMoreItems() {
  return this.filtered < this.items.length;
 }

 editUser = () => {};

 delUser = () => {};
}
