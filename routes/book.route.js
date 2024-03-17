var express = require("express");
const bookController = require("../controllers/book.controller.js");
var router = express.Router();

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/book/create", bookController.bookCreateGet);

// POST request for creating Book.
router.post("/book/create", bookController.bookCreatePost);

// GET request to delete Book.
router.get("/book/:id/delete", bookController.bookDeleteGet);

// POST request to delete Book.
router.post("/book/:id/delete", bookController.bookDeletePost);

// GET request to update Book.
router.get("/book/:id/update", bookController.bookUpdateGet);

// POST request to update Book.
router.post("/book/:id/update", bookController.bookUpdatePost);

// GET request for one Book.
router.get("/book/:id", bookController.queryBookInstancesByBookId);

// GET request for list of all Book items.
router.get("/books", bookController.queryAllBooks);

module.exports = router;
