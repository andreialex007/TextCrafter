import axios from 'axios';
import humps from 'humps';

export function setLocalItem<T>(key: string, obj: T) {
 (window as any).localStorage.setItem(key, JSON.stringify(obj));
}

export function getLocalItem<T>(key: string): T | null {
 let item = (window as any).localStorage.getItem(key);
 if (!item) return null;
 return JSON.parse(item) as T;
}

export function sleep(ms: number, id?: string) {
 return new Promise((resolve) => setTimeout(resolve, ms));
}

export const preloadImages = (imgList: Array<string>) => {
 (window as any).images = [];
 for (let i = 0; i < imgList.length; i++) {
  let images = (window as any).images;
  images[i] = new Image();
  images[i].src = imgList[i];
 }
};

export function initAxios(rootUrl: string) {
 axios.defaults.headers.post['Content-Type'] = 'application/json';
 axios.defaults.baseURL = rootUrl;
 axios.defaults.headers.post['Accept'] = '*/*';
 axios.defaults.headers.get['Cache-Control'] = 'no-cache';
 axios.defaults.headers.get['Pragma'] = 'no-cache';
 axios.defaults.headers.get['Expires'] = '0';
}
