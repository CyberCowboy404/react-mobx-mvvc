import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BooksPage from './books-page/BooksPage';
import NotFound from './not-found';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
