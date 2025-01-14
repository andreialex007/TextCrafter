import { makeAutoObservable } from 'mobx';

export default class AppStore {
	count = 0;

	constructor() {
		makeAutoObservable(this);
	}

	increment() {
		this.count += 1;
	}

	decrement() {
		this.count -= 1;
	}
}
