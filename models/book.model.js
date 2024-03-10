const db = require("./db.js");

class Book {
  constructor(book) {
    this.bookId = book.bookId;
    this.title = book.title;
    this.author = book.author;
    this.summary = book.summary;
    this.isbn = book.isbn;
    this.genre = book.genre;
    this.bookUrl = book.bookUrl;
  }

  static async create(newBook) {
    const [result] = await db.query("INSERT INTO book SET ?", [newBook]);
    return { id: result.insertId, ...newBook };
  }

  static async queryAll() {
    const [rows] = await db.query("SELECT * FROM book");
    return rows;
  }

  static async updateByBookId(book, bookId) {
    const [rows] = await db.query(
      "UPDATE book SET title = ?, author = ?, summary = ?, isbn = ?, genre = ?, bookUrl = ? WHERE bookId = ?",
      [
        book.title,
        book.author,
        book.summary,
        book.isbn,
        book.genre,
        book.bookUrl,
        bookId,
      ]
    );
    return rows;
  }

  static async deleteByBookId(bookId) {
    const [result] = await db.query("DELETE FROM book WHERE bookId = ?", [
      bookId,
    ]);
    return result[0];
  }
}

module.exports = Book;