// authors.dao.ts

import { Author } from './authors.model';

export class AuthorsDAO {
  private static authors: Author[] = [];

  static getAllAuthors(): Author[] {
    return AuthorsDAO.authors;
  }

  static getAuthorById(authorId: number): Author | undefined {
    return AuthorsDAO.authors.find((author) => author.authorId === authorId);
  }

  static createAuthor(author: Author): void {
    AuthorsDAO.authors.push(author);
  }

  static updateAuthor(authorId: number, updatedAuthor: Author): boolean {
    const index = AuthorsDAO.authors.findIndex((author) => author.authorId === authorId);
    if (index !== -1) {
      AuthorsDAO.authors[index] = { ...AuthorsDAO.authors[index], ...updatedAuthor };
      return true;
    }
    return false;
  }

  static deleteAuthor(authorId: number): boolean {
    const index = AuthorsDAO.authors.findIndex((author) => author.authorId === authorId);
    if (index !== -1) {
      AuthorsDAO.authors.splice(index, 1);
      return true;
    }
    return false;
  }
}
