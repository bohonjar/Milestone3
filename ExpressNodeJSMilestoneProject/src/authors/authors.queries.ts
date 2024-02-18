// authors.queries.ts

import { AuthorsDAO } from './authors.dao';
import { Author } from './authors.model';

export const getAllAuthors = (): Author[] => {
  return AuthorsDAO.getAllAuthors();
};

export const getAuthorById = (authorId: number): Author | undefined => {
  return AuthorsDAO.getAuthorById(authorId);
};

export const createAuthor = (author: Author): void => {
  AuthorsDAO.createAuthor(author);
};

export const updateAuthor = (authorId: number, updatedAuthor: Author): boolean => {
  return AuthorsDAO.updateAuthor(authorId, updatedAuthor);
};

export const deleteAuthor = (authorId: number): boolean => {
  return AuthorsDAO.deleteAuthor(authorId);
};
