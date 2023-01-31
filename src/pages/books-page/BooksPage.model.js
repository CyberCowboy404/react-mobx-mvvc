import { apiClient } from 'utils/ApiClient';

export default class BooksModel {
  constructor({ user }) {
    if (!user) {
      throw new Error('User is required');
    }
    this.user = user;
    this.path = `/books/${user}`;
  }
  getPublicBooks = (user) => {
    return apiClient.get(this.path);
  };

  getPrivateBooks = (user) => {
    return apiClient.get(`${this.path}/private`);
  };

  createBook = async ({ name, author } = {}) => {
    if (this.isBookDataValid({ name, author })) {
      return await apiClient.post(this.path, { name, author });
    } else {
      return Promise.reject('Invalid book data');
    }
  };

  isBookDataValid({ name, author }) {
    const error = [];
    if (!name) {
      error.push('Please provide a name');
    }

    if (!author) {
      error.push('Please provide an author');
    }

    return error.length === 0 ? true : false;
  }
}
