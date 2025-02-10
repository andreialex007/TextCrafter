import { computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { getLocalItem, setLocalItem } from './Utils';
import axios from 'axios';

class AuthStore {
 @observable
 name: string | null = null;
 @observable
 id: number | null = null;
 @observable
 role: string | null = null;

 @computed
 get isAuthenticated() {
  return !!this.id;
 }
 @computed
 get isAdmin() {
  return (this.role ?? '') === 'admin';
 }

 login(token: string) {
  setLocalItem<string>('token', token);
 }

 async logout(redirect: boolean = true) {
  await axios.post(
   `/auth/logout`,
   {},
   {
    withCredentials: true,
   },
  );
  setLocalItem<string>('token', '');

  this.id = null;
 }

 refresh = () => {
  this.refreshAxios();
  if (!!getLocalItem<string>('token')) {
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
  makeObservable(this);
 }
}

export default new AuthStore();
