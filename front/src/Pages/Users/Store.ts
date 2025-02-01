import { makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import ItemEditStore from './Edit/Store.ts';

type UserDto = {
 id?: number;
 name: string;
 email: string;
 role: string;
};

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

 editUser = () => {};

 delUser = () => {};
}
