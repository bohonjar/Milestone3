import express from 'express';
import authorsRouter from './src/authors/authors.routes';
import booksRouter from './src/books/books.routes';
import dotenv from 'dotenv';
import logger from './src/middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import mysql from 'mysql';
import path from 'path';

// Load environment variables from the .env file.
dotenv.config();

// Database Configuration
const dbConfig = {
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'serverdb',
  password: process.env.PASSWORD || 'root',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  database: process.env.DATABASE || 'bookstore',
  connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT, 10) : 30,
};

// Create an instance of the express application.
const app = express();

// Specify the port number for the server to listen on.
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(logger);

// Set Content Security Policy (CSP) header middleware
app.use((req, res, next) => {
  // Set CSP header to allow unsafe-inline for testing purposes
  res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net");
  next();
});

// Database Connection
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
  console.log(process.env.GREETING + ' in dev mode');
}

app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/authorPage', (req, res) => {

  res.sendFile(path.join(__dirname, 'authorPage.html'));
});

app.get('/bookPage', (req, res) => {

  res.sendFile(path.join(__dirname, 'bookPage.html'));
});

app.get('/creationPage', (req, res) => {

  res.sendFile(path.join(__dirname, 'creationPage.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
