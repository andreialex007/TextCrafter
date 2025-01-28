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

 async handleLogin(navigate: (path: string) => void) {
  const response = await axios.post(
   '/auth/token',
   {
    username: this.username,
    password: this.password,
   },
   {
    withCredentials: true,
   },
  );
  const setCookieHeader = response.headers['set-cookie'];

  if (setCookieHeader) {
   AuthStore.login();
   console.log('Token stored in HTTP-only cookies:', setCookieHeader);
   return;
  }
  console.log(
   'No Set-Cookie header in response. Is the API configured to set the HTTP-only token cookie?',
  );
 }
}

export default new LoginStore();
