var express = require("express");
const authorController = require("../controllers/author.controller.js");
const { asyncHandler } = require("../utils/asyncErrorHandler.js");
var router = express.Router();

router.get("/author/create", authorController.authorCreateGet);

// POST request for creating Author.
router.post("/author/create", authorController.authorCreateGet);

// GET request to delete Author.
router.get("/author/:id/delete", authorController.authorDeleteGet);

// POST request to delete Author.
router.post("/author/:id/delete", authorController.authorDeletePost);

// GET request to update Author.
router.get("/author/:id/update", authorController.authorUpdateGet);

// POST request to update Author.
router.post("/author/:id/update", authorController.authorUpdatePost);

// GET request for one Author.
router.get("/author/:id", authorController.queryByAuthorId);

// GET request for list of all Authors.
router.get("/", authorController.queryAllAuthors);

module.exports = router;
