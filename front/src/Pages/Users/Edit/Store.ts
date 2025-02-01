import { makeAutoObservable, makeObservable, observable } from 'mobx';

export default class Store {
 @observable
 loading = false;

 constructor() {
  makeObservable(this);
 }

 //todo write methods
}
