import { action, computed, makeAutoObservable } from 'mobx';

import AboutStore from './Pages/About/Store';
import HomeStore from './Pages/Home/Store';
import PromptsStore from './Pages/Prompts/Store';
import UsersStore from './Pages/Users/Store';
import NavItem from './Common/NavItem.ts';

const components = import.meta.glob('./Pages/*/index.tsx', { eager: true });
const compStores = import.meta.glob('./Pages/*/Store.ts', { eager: true });

export const allPages = Object.entries(components)
 .filter((x) => !x[0].includes('Login'))
 .map((component, index) => {
  let elem = component as any;
  let storeFunc = (Object.values(compStores) as any)[index].default;
  return {
   component: elem[1].default,
   store: new storeFunc() as NavItem,
   name: elem[0].split('/')[2],
  };
 });

export default class AppStore {
 aboutStore = new AboutStore();
 promptsStore = new PromptsStore();
 homeStore = new HomeStore();
 usersStore = new UsersStore();

 navItems = [this.homeStore, this.promptsStore, this.usersStore, this.aboutStore];

 constructor() {
  makeAutoObservable(this);
 }

 @computed
 getActivePage(location: string) {
  return this.navItems.find((x) => x.isActive(location));
 }
}
