import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'serverdb',
  password: process.env.PASSWORD || 'root',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  database: process.env.DATABASE || 'bookstore',
};

class DbService {
  private static instance: DbService | null = null;
  private connection: mysql.Connection;

  private constructor() {
    this.connection = mysql.createConnection(dbConfig);
  }

  public static getDbServiceInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }
    return DbService.instance;
  }

  public async getAllAuthors(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM authors';
      this.connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  public async insertAuthor(author: any): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO authors SET ?';
      this.connection.query(query, author, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  public async updateAuthor(authorId: number, authorData: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE authors SET ? WHERE authorId = ?';
      this.connection.query(query, [authorData, authorId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  public async deleteAuthor(authorId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM authors WHERE authorId = ?';
      this.connection.query(query, authorId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  public async getAllBooks(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM books';
      this.connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  public async insertBook(book: any): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO books SET ?';
      this.connection.query(query, book, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  public async updateBook(bookId: number, bookData: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE books SET ? WHERE bookId = ?';
      this.connection.query(query, [bookData, bookId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  public async deleteBook(bookId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM books WHERE bookId = ?';
      this.connection.query(query, bookId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  public async getBookById(bookId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM books WHERE bookId = ?';
      this.connection.query(query, [bookId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public closeConnection(): void {
    this.connection.end();
  }
}

export default DbService;
