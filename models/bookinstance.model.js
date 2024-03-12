const db = require("../config/db");

class BookInstance {
  constructor(bookInstance) {
    this.bookInstanceId = bookInstance.bookInstanceId;
    this.bookId = bookInstance.bookId;
    this.imprint = bookInstance.imprint;
    this.status = bookInstance.status;
    this.dueDate = bookInstance.dueDate;
    this.bookInstanceUrl = bookInstance.bookInstanceUrl;
  }

  static async create(newBookInstance) {
    const [result] = await db.query("INSERT INTO bookInstance SET ?", [
      newBookInstance,
    ]);
    return { id: result.insertId, ...newBookInstance };
  }

  static async queryAll() {
    const [rows] = await db.query("SELECT * FROM bookInstance");
    return rows;
  }

  static async queryByBookInstanceId(bookInstanceId) {
    const [result] = await db.query(
      "SELECT * FROM bookInstance WHERE bookInstanceId = ?",
      [bookInstanceId]
    );
    return result[0];
  }

  static async updateByBookInstanceId(bookInstance, bookInstanceId) {
    const [rows] = await db.query(
      "UPDATE bookInstance SET bookId = ? imprint = ?, status = ?, dueDate = ?, bookInstanceUrl = ? WHERE bookInstanceId = ?",
      [
        bookInstance.bookId,
        bookInstance.imprint,
        bookInstance.status,
        bookInstance.dueDate,
        bookInstance.bookInstanceUrl,
        bookInstanceId,
      ]
    );
    return rows;
  }

  static async deleteByBookInstanceId(bookInstanceId) {
    const [result] = await db.query(
      "DELETE FROM bookInstance WHERE bookInstanceId = ?",
      [bookInstanceId]
    );
    return result[0];
  }
}

module.exports = BookInstance;
