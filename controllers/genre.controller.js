const Genre = require("../models/genre.model.js");
const { asyncHandler } = require("../utils/asyncErrorHandler");

// Display list of all Genre.
exports.queryAllGenres = asyncHandler(async (req, res, next) => {
  const genresList = await Genre.queryAll();
  res.render("genresList", {
    title: "List of Genres",
    genresList: genresList,
  });
});

// Display books for a specific Genre ID.
exports.queryBooksByGenreId = asyncHandler(async (req, res, next) => {
  let genreId = req.params.id;
  let booksInGenre = await Genre.queryBooksByGenreId(genreId);

  if (booksInGenre === null) {
    const err = new Error("GenreId not found");
    err.status = 404;
    return next(err);
  }
  return res.render("genreDetail", {
    title: booksInGenre[0].genreName,
    booksInGenre: booksInGenre,
  });
});

// Display genre create form on GET.
exports.genreCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// Handle genre create on POST.
exports.genreCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display genre delete form on GET.
exports.genreDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle genre delete on POST.
exports.genreDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display genre update form on GET.
exports.genreUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle genre update on POST.
exports.genreUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
