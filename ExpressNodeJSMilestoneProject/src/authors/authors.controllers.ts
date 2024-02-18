// authors.controllers.ts
import { Request, Response } from 'express';
import { execute } from '../services/dbService';

export const getAllAuthors = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = 'SELECT authorid as id, author_name FROM authors';
    const authors = await execute(query, []);
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAuthorById = async (req: Request, res: Response): Promise<void> => {
  const authorId = req.params.authorId;
  try {
    const query = 'SELECT * FROM authors WHERE authorId = ?';
    const author = await execute(query, [authorId]);
    res.json(author);
  } catch (error) {
    console.error('Error fetching author by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createAuthor = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  try {
    const query = 'INSERT INTO authors (name) VALUES (?)';
    await execute(query, [name]);
    res.status(201).json({ message: 'Author created successfully' });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateAuthor = async (req: Request, res: Response): Promise<void> => {
  const authorId = req.params.authorId;
  const { name } = req.body;
  try {
    const query = 'UPDATE authors SET name = ? WHERE authorId = ?';
    await execute(query, [name, authorId]);
    res.json({ message: 'Author updated successfully' });
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
  const authorId = req.params.authorId;
  try {
    const query = 'DELETE FROM authors WHERE authorId = ?';
    await execute(query, [authorId]);
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
