import express from 'express';
import DbService from '../services/dbService';

const router = express.Router();
const dbService = DbService.getDbServiceInstance();

router.get('/', async (req, res) => {
  try {
    const books = await dbService.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:bookId', async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  try {
    const book = await dbService.getBookById(bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { title, authorId, publicationYear, genre } = req.body;
  try {
    const bookId = await dbService.insertBook({ title, authorId, publicationYear, genre });
    res.status(201).json({ message: 'Book created successfully', bookId });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:bookId', async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const { title, authorId, publicationYear, genre } = req.body;
  try {
    const success = await dbService.updateBook(bookId, { title, authorId, publicationYear, genre });
    if (success) {
      res.json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:bookId', async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  try {
    const success = await dbService.deleteBook(bookId);
    if (success) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
