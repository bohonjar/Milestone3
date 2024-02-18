// books.queries.ts

import { BooksDAO } from './books.dao';
import { Book } from './books.model';

export const getAllBooks = (): Book[] => {
  return BooksDAO.getAllBooks();
};

export const getBookById = (bookId: number): Book | undefined => {
  return BooksDAO.getBookById(bookId);
};

export const createBook = (book: Book): void => {
  BooksDAO.createBook(book);
};

export const updateBook = (bookId: number, updatedBook: Book): boolean => {
  return BooksDAO.updateBook(bookId, updatedBook);
};

export const deleteBook = (bookId: number): boolean => {
  return BooksDAO.deleteBook(bookId);
};
