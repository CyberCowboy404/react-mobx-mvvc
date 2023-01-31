import React, { useState, useEffect, useContext } from 'react';
import { observer, MobXProviderContext } from 'mobx-react';
import Books from 'components/books/Books';
import BooksController from './BooksPage.ctrl';
import Loader from 'components/loader/Loader';
import './BooksPage.scss';

const BooksPage = (...app) => {
  const { auth } = useContext(MobXProviderContext);
  const [controller] = useState(
    new BooksController({ user: auth.currentUser })
  );

  useEffect(() => {
    controller.getPublicBooks();
  }, [controller]);

  return (
    <article className="books-page">
      <h1>Books</h1>

      <h5>Current user : { auth.currentUser }</h5>

      <section className="books-page--switcher">
        <button
          className={controller.isCurrent(controller.isPublic)}
          onClick={() => controller.getPublicBooks()}
        >
          Public Books
        </button>
        <button
          className={controller.isCurrent(controller.isPrivate)}
          onClick={() => controller.getPrivateBooks()}
        >
          Private Books
        </button>
      </section>

      <Loader visible={controller.isLoading} />

      <Books visible={controller.showPublic} books={controller.publicBooks} />
      <Books visible={controller.showPrivate} books={controller.privateBooks} />
    </article>
  );
};

export default observer(BooksPage);
