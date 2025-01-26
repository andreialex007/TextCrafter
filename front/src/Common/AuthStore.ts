import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { getLocalItem, setLocalItem } from './Utils';

class AuthStore {
 token: string | null = null;
 isAuthenticated = false;

 login(token: string) {
  this.isAuthenticated = true;
  this.token = token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  setLocalItem('userToken', token);
 }

 logout() {
  this.isAuthenticated = false;
  this.token = '';

  setLocalItem('userToken', '');

  delete axios.defaults.headers.common['Authorization'];
 }
 constructor() {
  makeAutoObservable(this);

  const tokenFromStorage = getLocalItem<string>('userToken');
  if (tokenFromStorage) {
   this.login(tokenFromStorage);
  }
 }
}

export default new AuthStore();
