import { makeAutoObservable } from 'mobx';
import { getLocalItem, setLocalItem } from './Utils';
import axios from 'axios';

class AuthStore {
 name: string | null = null;
 id: number | null = null;
 role: string | null = null;

 get isAuthenticated() {
  return !!getLocalItem<string>('token');
 }

 get isAdmin() {
  return (this.role ?? '') === 'admin';
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

  location.href = '/login';
  this.refresh();
 }

 refresh = () => {
  this.refreshAxios();
  if (this.isAuthenticated) {
   this.decodeToken(getLocalItem<string>('token')!);
   console.log('role=', this.role);
  }
 };

 refreshAxios = () => {
  let token = getLocalItem<string>('token');

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
  this.role = payloadJson.role || null;
 }

 constructor() {
  makeAutoObservable(this);
 }
}

export default new AuthStore();
