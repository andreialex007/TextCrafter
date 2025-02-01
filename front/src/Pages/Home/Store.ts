import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '../../Common/NavItem.ts';
import axios from 'axios';

type StatInfo = { categories: number; prompts: number };
export default class Store extends NavItem {
 @observable
 loading = false;

 @observable
 stat: StatInfo = {} as any;

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

 load = async () => {
  let resp = await axios.get<StatInfo>('/categories/stat');
  this.stat = resp.data;
 };
}
