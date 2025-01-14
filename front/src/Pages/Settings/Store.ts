import { action, makeAutoObservable, makeObservable, observable } from 'mobx';

export default class Store {
	loading = false;

	constructor() {
		makeAutoObservable(this);
	}
}
