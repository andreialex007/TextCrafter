import { makeAutoObservable } from 'mobx';

class DialogStore {
 isOpen = false;
 message = '';
 private resolveCallback: ((value: boolean) => void) | null = null;

 constructor() {
  makeAutoObservable(this);
 }

 confirm = (message: string): Promise<boolean> => {
  this.message = message;
  this.isOpen = true;

  return new Promise<boolean>((resolve) => {
   this.resolveCallback = resolve;
  });
 };

 handleConfirm = () => {
  if (this.resolveCallback) this.resolveCallback(true);
  this.close();
 };

 handleCancel = () => {
  if (this.resolveCallback) {
   this.resolveCallback(false);
  }
  this.close();
 };

 close = () => {
  this.isOpen = false;
  this.message = '';
  this.resolveCallback = null;
 };
}

export default new DialogStore();
