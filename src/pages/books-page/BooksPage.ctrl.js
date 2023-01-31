import { makeAutoObservable } from 'mobx';
import BooksModel from './BooksPage.model';

export default class BooksController {
  publicBooks = [];
  privateBooks = [];
  isLoading = false;
  isPrivate = false;
  isPublic = true;
  error = null;

  constructor({ user }) {
    this.model = new BooksModel({ user });
    this.user = user;
    makeAutoObservable(this);
  }

  createBook = async (book) => {
    this.isLoading = true;

    try {
      return await this.model.createBook(book);
    } catch (e) {
      this.error = e;
      // console.debug(e);
      return this.error;
    } finally {
      this.isLoading = false;
    }
  }

  getPublicBooks = async () => {
    this.isLoading = true;

    // cache results in order to not make unnecessary requests
    if (this.publicBooks.length) {
      this.setPublic();
      this.isLoading = false;
      return;
    }

    try {
      this.publicBooks = await this.model.getPublicBooks();
    } catch (e) {
      this.error = e;
      // console.debug(e);
    } finally {
      this.isLoading = false;
      this.setPublic();
    }
  }

  getPrivateBooks = async () => {
    this.isLoading = true;

    // cache results in order to not make unnecessary requests
    if (this.privateBooks.length) {
      this.setPrivate();
      this.isLoading = false;
      return;
    }

    try {
      this.privateBooks = await this.model.getPrivateBooks();
    } catch (e) {
      this.error = e;
      // console.debug(e);
    } finally {
      this.isLoading = false;
      this.setPrivate();
    }
  }

  setPrivate = () => {
    this.isPrivate = true;
    this.isPublic = false;
  }

  get showPrivate() {
    return this.isPrivate && !this.isLoading;
  }

  setPublic = () => {
    this.isPrivate = false;
    this.isPublic = true;
  }

  get showPublic() {
    return this.isPublic && !this.isLoading;
  }

  isCurrent = (type) => {
    return type ? 'books-page--switcher__current' : '';
  }
}
