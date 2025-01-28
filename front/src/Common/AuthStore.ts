import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { getLocalItem, setLocalItem } from './Utils';

class AuthStore {
 isAuthenticated = false;

 login() {
  this.isAuthenticated = true;
 }

 logout() {
  this.isAuthenticated = false;
 }
 constructor() {
  makeAutoObservable(this);
 }
}

export default new AuthStore();
