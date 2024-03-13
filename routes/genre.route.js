var express = require("express");
const genreController = require("../controllers/genre.controller.js");
const { asyncHandler } = require("../utils/asyncErrorHandler.js");
var router = express.Router();

router.get("/genre/create", genreController.genreCreateGet);

//POST request for creating Genre.
router.post("/genre/create", genreController.genreCreatePost);

// GET request to delete Genre.
router.get("/genre/:id/delete", genreController.genreDeleteGet);

// POST request to delete Genre.
router.post("/genre/:id/delete", genreController.genreDeletePost);

// GET request to update Genre.
router.get("/genre/:id/update", genreController.genreUpdateGet);

// POST request to update Genre.
router.post("/genre/:id/update", genreController.genreUpdatePost);

// GET request for one Genre.
router.get("/genre/:id", genreController.queryByGenreId);

// GET request for list of all Genre.
router.get("/genres", genreController.queryAllGenres);

module.exports = router;
