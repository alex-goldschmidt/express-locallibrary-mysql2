const Genre = require("../models/genre.model.js");
const { asyncHandler } = require("../utils/asyncErrorHandler");
const { body, validationResult } = require("express-validator");

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
  let genre = await Genre.queryByGenreId(genreId);
  let booksInGenre = await Genre.queryBooksByGenreId(genreId);

  if (!booksInGenre.length) {
    const err = new Error(`The ${genre.genreName} genre has no books`);
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
  res.render("genreForm", { title: "Create Genre" });
});

exports.genreCreatePost = [
  body("genreName", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ genreName: req.body.genreName });

    if (errors.isEmpty()) {
      const genreExists = await Genre.queryByGenreName({
        genreName: req.body.genreName,
      });
      if (genreExists) {
        res.redirect(`/catalog/genre/${genreExists.genreId}`);
      } else {
        const data = await Genre.create(genre);
        res.redirect(`/catalog/genre/${data.genreId}`);
      }
    } else {
      res.render("genreForm", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }
  }),
];

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
