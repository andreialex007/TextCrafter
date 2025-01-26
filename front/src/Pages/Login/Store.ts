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
  try {
   const response = await axios.post('/Auth/login', {
    username: this.username,
    password: this.password,
   });
   AuthStore.login(response.data);
   navigate('/');
  } catch (error) {
   console.error('Login error', error);
  }
 }
}

export default new LoginStore();
