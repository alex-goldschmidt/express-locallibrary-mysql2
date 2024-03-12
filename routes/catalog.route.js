var express = require("express");
var router = express.Router();
var book = require("./book.route.js");
var author = require("./author.route.js");
var bookInstance = require("./bookInstance.route.js");
var genre = require("./author.route.js");

router.use("/books", book);
router.use("/authors", author);
router.use("/bookInstances", bookInstance);
router.use("/genres", genre);

module.exports = router;
