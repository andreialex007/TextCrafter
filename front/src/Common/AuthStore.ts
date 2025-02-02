import { makeAutoObservable } from 'mobx';
import { getLocalItem, setLocalItem } from './Utils';
import axios from 'axios';

class AuthStore {
 name: string | null = null;
 id: number | null = null;

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
  this.refresh();
  location.href = '/login';
 }

 refresh = () => {
  let token = getLocalItem<string>('token');
  this.decodeToken(token!);
  axios.defaults.headers.common.Authorization =
   this.isAuthenticated === null ? null : `Bearer ${token}`;
 };

 decodeToken(token: string) {
  const [, payloadBase64] = token.split('.');
  if (!payloadBase64) {
   throw new Error('Invalid token format');
  }
  const payloadJson = JSON.parse(atob(payloadBase64)); // atob decodes Base64
  this.name = payloadJson.name || null;
  this.id = payloadJson.id || null;
 }

 constructor() {
  makeAutoObservable(this);
 }
}

export default new AuthStore();
