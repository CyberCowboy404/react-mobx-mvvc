import { makeAutoObservable } from "mobx";

export default class AuthStore {
  user = 'postnikov';

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get currentUser() {
    return this.user;
  }

  async logout() {
    this.user = null;
  }

  get isLoggedIn() {
    return !!this.user;
  }
}