// books.controllers.ts
import { Request, Response } from 'express';
import { execute } from '../services/dbService';

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = 'SELECT bookid as id, title as book_title, authorid FROM books';
    const books = await execute(query, []);
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  const bookId = req.params.bookId;
  try {
    const query = 'SELECT * FROM books WHERE bookId = ?';
    const book = await execute(query, [bookId]);
    res.json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  const { title, authorId, publicationYear, genre } = req.body;
  try {
    const query = 'INSERT INTO books (title, authorId, publicationYear, genre) VALUES (?, ?, ?, ?)';
    await execute(query, [title, authorId, publicationYear, genre]);
    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const bookId = req.params.bookId;
  const { title, authorId, publicationYear, genre } = req.body;
  try {
    const query = 'UPDATE books SET title = ?, authorId = ?, publicationYear = ?, genre = ? WHERE bookId = ?';
    await execute(query, [title, authorId, publicationYear, genre, bookId]);
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const bookId = req.params.bookId;
  try {
    const query = 'DELETE FROM Books WHERE bookId = ?';
    await execute(query, [bookId]);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
