import { makeAutoObservable } from "mobx";

export default class AuthStore {
  user = 'Nickolas';

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get currentUser() {
    return this.user;
  }
}