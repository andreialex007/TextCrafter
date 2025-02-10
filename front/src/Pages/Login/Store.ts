import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import AuthStore from './../../Common/AuthStore';

class LoginStore {
 username = '';
 password = '';

 constructor() {
  makeAutoObservable(this);
 }

 setUsername(username: string) {
  this.username = username;
 }

 setPassword(password: string) {
  this.password = password;
 }

 async handleLogin(reload = true) {
  const response = await axios.post<{ token: string }>(
   '/auth/token',
   {
    username: this.username,
    password: this.password,
   },
   {
    withCredentials: true,
   },
  );
  AuthStore.login(response.data.token, reload);
 }
}

export default new LoginStore();
