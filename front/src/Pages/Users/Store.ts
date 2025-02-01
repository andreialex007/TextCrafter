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

 @observable
 edit = new ItemEditStore();

 @observable
 items: Array<UserDto> = [
  {
   id: 5,
   email: 'test@test.com',
   name: 'Ivanov Ivan',
   role: 'admin',
  },
  {
   id: 6,
   email: 'petrov@test.com',
   name: 'Petrov Petr',
   role: 'user',
  },
  {
   id: 7,
   email: 'sidorov@test.com',
   name: 'Sidorov Sidor',
   role: 'user',
  },
  {
   id: 8,
   email: 'kovalev@test.com',
   name: 'Kovalev Koval',
   role: 'user',
  },
 ];

 @observable
 searchId = '';

 @observable
 searchRole = '';

 @observable
 searchEmail = '';

 @observable
 searchName = '';

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
