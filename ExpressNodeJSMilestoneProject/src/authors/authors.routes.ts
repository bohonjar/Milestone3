import express from 'express';
import DbService from '../services/dbService';

const router = express.Router();
const dbService = DbService.getDbServiceInstance();

router.get('/', async (req, res) => {
  try {
    const authors = await dbService.getAllAuthors();
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const authorId = await dbService.insertAuthor({ name });
    res.status(201).json({ message: 'Author created successfully', authorId });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:authorId', async (req, res) => {
  const authorId = parseInt(req.params.authorId);
  const { name } = req.body;
  try {
    const success = await dbService.updateAuthor(authorId, { name });
    if (success) {
      res.json({ message: 'Author updated successfully' });
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:authorId', async (req, res) => {
  const authorId = parseInt(req.params.authorId);
  try {
    const success = await dbService.deleteAuthor(authorId);
    if (success) {
      res.json({ message: 'Author deleted successfully' });
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
