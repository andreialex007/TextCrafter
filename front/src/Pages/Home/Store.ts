import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';

export default class Store extends NavItem {
 @observable
 loading = false;

 constructor() {
  super();
  makeObservable(this);
 }

 name = 'Home';
 icon = 'home-2-fill';
 url = '/';

 override isActive(currentLocation: string): boolean {
  return currentLocation === this.url;
 }
}
