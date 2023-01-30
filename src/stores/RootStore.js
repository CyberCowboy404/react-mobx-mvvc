import AuthStore from "./UserStore";

export default class RootStore {
  constructor() {
    this.auth = new AuthStore(this);
  }
}