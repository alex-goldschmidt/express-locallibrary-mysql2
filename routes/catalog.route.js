var express = require("express");
var router = express.Router();
var book = require("./book.route.js");
var bookController = require("../controllers/book.controller.js");
var author = require("./author.route.js");
var bookInstance = require("./bookInstance.route.js");
var genre = require("./genre.route.js");

// GET catalog home page.
router.get("/", bookController.index);

router.use("/", book);
router.use("/", author);
router.use("/", bookInstance);
router.use("/", genre);

module.exports = router;
