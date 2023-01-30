import React from 'react';
import { observer } from 'mobx-react';
import { BooksType } from './Books.type';
import './Books.scss';

const Books = ({ books = [], visible = true }) => {
  if (!visible) {
    return null;
  }

  if (!books.length) {
    return <p>No books</p>;
  }

  return (
    <table className="books">
      <thead>
        <tr>
          <th>№</th>
          <th>Id</th>
          <th>Name</th>
          <th>Author</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.ownerId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Books.propTypes = BooksType;

export default observer(Books);
