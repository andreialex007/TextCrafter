import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';

import AboutStore from './Pages/About/Store';
import HomeStore from './Pages/Home/Store';
import PromptsStore from './Pages/Prompts/Store';
import SettingsStore from './Pages/Settings/Store';
import UsersStore from './Pages/Users/Store';
import NavItem from './Common/NavItem.ts';
import AuthStore from '@/Common/AuthStore.ts';

const components = import.meta.glob('./Pages/*/index.tsx', { eager: true });
const compStores = import.meta.glob('./Pages/*/Store.ts', { eager: true });

let sampleText = `A smartphone is a mobile device that combines the functionality of a traditional mobile phone with advanced computing capabilities. It typically has a touchscreen interface, allowing users to access a wide range of applications and services, such as web browsing, email, and social media, as well as multimedia playback and streaming. Smartphones have built-in cameras, GPS navigation, and support for various communication methods, including voice calls, text messaging, and internet-based messaging apps.

Smartphones are distinguished from older-design feature phones by their more advanced hardware capabilities and extensive mobile operating systems, access to the internet, business applications, mobile payments, and multimedia functionality, including music, video, gaming, radio, and television.
`;

export const allPages = Object.entries(components)
 .filter((x) => !x[0].includes('Login'))
 .map((component, index) => {
  let elem = component as any;
  let storeFunc = (compStores as any)[component[0].replace('index.tsx', 'Store.ts')]
   .default;
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
 settingsStore = new SettingsStore();

 @computed
 get navItems() {
  let first: Array<any> = [this.homeStore, this.promptsStore];
  let second: Array<any> = [this.aboutStore];
  return first
   .concat(
    AuthStore.isAdmin ? [this.usersStore, this.settingsStore] : [this.settingsStore],
   )
   .concat(second);
 }

 constructor() {
  makeObservable(this);
  setTimeout(() => {
   this.promptsStore.textExample = sampleText;
  }, 10);
 }

 getActivePage(location: string) {
  return this.navItems.find((x) => x.isActive(location));
 }
}
