import { makeAutoObservable, makeObservable, observable } from 'mobx';

export default class Store {
 @observable
 isOpen: boolean = false;

 constructor() {}
}
