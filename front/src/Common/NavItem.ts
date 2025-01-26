import { computed, observable } from 'mobx';

export default abstract class NavItem {
 protected constructor() {}

 abstract url: string;
 abstract name: string;
 abstract icon: string;

 isActive(currentLocation: string) {
  return currentLocation.toLowerCase().startsWith(this.url.toLowerCase());
 }
}
