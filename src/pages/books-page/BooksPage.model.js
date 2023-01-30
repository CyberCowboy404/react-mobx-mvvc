import { apiClient } from "utils/ApiClient";

export default class BooksModel {
  getPublicBooks = (user) => {
    return apiClient.get(`/books/${user}`);
  };

  getPrivateBooks = (user) => {
    return apiClient.get(`/books/${user}/private`);
  };

  createBook = async ({ name, author }) => {
    const bookAddDto = await apiClient.post("/books", { name, author });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };

}
