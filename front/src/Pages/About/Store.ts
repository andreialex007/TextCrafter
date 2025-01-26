import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';

export default class Store extends NavItem {
 @observable
 loading = false;

 constructor() {
  super();
  makeObservable(this);
 }

 url = '/about';
 name = 'About';
 icon = 'question-fill';
}
