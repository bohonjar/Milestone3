// books.dao.ts

import { Book } from './books.model';

export class BooksDAO {
  private static books: Book[] = [];

  static getAllBooks(): Book[] {
    return BooksDAO.books;
  }

  static getBookById(bookId: number): Book | undefined {
    return BooksDAO.books.find((book) => book.bookId === bookId);
  }

  static createBook(book: Book): void {
    BooksDAO.books.push(book);
  }

  static updateBook(bookId: number, updatedBook: Book): boolean {
    const index = BooksDAO.books.findIndex((book) => book.bookId === bookId);
    if (index !== -1) {
      BooksDAO.books[index] = { ...BooksDAO.books[index], ...updatedBook };
      return true;
    }
    return false;
  }

  static deleteBook(bookId: number): boolean {
    const index = BooksDAO.books.findIndex((book) => book.bookId === bookId);
    if (index !== -1) {
      BooksDAO.books.splice(index, 1);
      return true;
    }
    return false;
  }
}
