import { makeObservable, observable } from 'mobx';
import axios from 'axios';
import type { UserDto } from '@/Pages/Users/Store.ts';

export default class Store {
 @observable
 loading = false;

 @observable
 user: UserDto = {} as any;

 constructor() {
  makeObservable(this);
 }

 loadUser = async (id: string) => {
  if (id == '0') {
   this.resetForm();
   return;
  }
  this.loading = true;
  const response = await axios.get<UserDto>(`/users/${id}`);
  this.user = response.data;
  this.loading = false;
 };

 saveUser = async () => {
  this.loading = true;
  let url = !this.user.id ? `/users/` : `/users/${this.user.id}`;
  const response = await axios[!this.user.id ? 'post' : 'put'](url, this.user);
  this.user = response.data;
  this.loading = false;
 };
 resetForm = () => {
  this.user = {} as any;
 };
}
