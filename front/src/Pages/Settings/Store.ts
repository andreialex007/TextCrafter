import { makeAutoObservable, makeObservable, observable } from 'mobx';
import NavItem from '@/Common/NavItem.ts';
import axios from 'axios';

type SettingDto = {
 id: number;
 user_id: number;
 name: string;
 value: string;
};

export default class Store extends NavItem {
 @observable
 loading = false;

 items: Array<SettingDto> = [];

 constructor() {
  super();
  makeObservable(this);
 }

 name = 'Settings';
 icon = 'settings-4-fill';
 url = '/settings';

 load = async () => {
  let resp = await axios.get<Array<SettingDto>>(`/settings/my`);
  this.items = resp.data;
 };
}
