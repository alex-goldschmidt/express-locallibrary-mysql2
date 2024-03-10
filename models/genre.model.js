const db = require("./db.js");

class Genre {
  constructor(genre) {
    this.genreId = genre.genreId;
    this.genreName = genre.genreName;
    this.genreUrl = genre.genreUrl;
  }

  static async create(newGenre) {
    const [result] = await db.query("INSERT INTO genre SET ?", [newGenre]);
    return { id: result.insertId, ...newGenre };
  }

  static async queryAll() {
    const [rows] = await db.query("SELECT * FROM genre");
    return rows;
  }

  static async updateByGenreId(genre, genreId) {
    const [rows] = await db.query(
      "UPDATE genre SET genreName = ?, genreUrl = ? WHERE genreId = ?",
      [genre.genreName, genreUrl, genreId]
    );
    return rows;
  }

  static async deleteByGenreId(genreId) {
    const [result] = await db.query("DELETE FROM genre WHERE genreId = ?", [
      genreId,
    ]);
    return result[0];
  }
}

module.exports = Genre;
