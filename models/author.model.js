const db = require("./db.js");

class Author {
  constructor(author) {
    this.authorId = author.authorId;
    this.firstName = author.firstName;
    this.lastName = author.lastName;
    this.dateOfBirth = author.dateOfBirth;
    this.dateOfDeath = author.dateOfDeath;
    this.lifespan = author.lifespan;
    this.authorUrl = author.authorUrl;
  }

  static async create(newAuthor) {
    const [result] = await db.query("INSERT INTO author SET ?", [newAuthor]);
    return { id: result.insertId, ...newAuthor };
  }

  static async queryAll() {
    const [rows] = await db.query("SELECT * FROM author");
    return rows;
  }

  static async updateByAuthorId(author, authorId) {
    const [rows] = await db.query(
      "UPDATE author SET firstName = ?, lastName = ?, dateOfBirth = ?, dateOfDeath = ?, lifespan = ?, authorUrl = ? WHERE authorId = ?",
      [
        author.firstName,
        author.lastName,
        author.dateOfBirth,
        author.dateOfDeath,
        author.lifespan,
        author.authorUrl,
        authorId,
      ]
    );
    return rows;
  }

  static async deleteByAuthorId(authorId) {
    const [result] = await db.query("DELETE FROM author WHERE authorId = ?", [
      authorId,
    ]);
    return result[0];
  }
}

module.exports = Author;