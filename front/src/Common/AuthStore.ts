import { makeAutoObservable } from 'mobx';
import { getLocalItem, setLocalItem } from './Utils';
import axios from 'axios';

class AuthStore {
 get isAuthenticated() {
  return !!getLocalItem<string>('token');
 }

 login(token: string) {
  setLocalItem<string>('token', token);
  location.href = '/';
 }

 async logout() {
  await axios.post(
   `/auth/logout`,
   {},
   {
    withCredentials: true,
   },
  );
  setLocalItem<string>('token', '');
  this.refreshAxios();
  location.href = '/login';
 }

 refreshAxios = () => {
  axios.defaults.headers.common.Authorization =
   this.isAuthenticated === null ? null : `Bearer ${getLocalItem<string>('token')}`;
 };

 constructor() {
  makeAutoObservable(this);
 }
}

export default new AuthStore();
