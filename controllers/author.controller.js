const Author = require("../models/author.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");
const { body, validationResult } = require("express-validator");

// Display list of all Authors.
exports.queryAllAuthors = asyncHandler(async (req, res, next) => {
  const authorsList = await Author.queryAllAuthors();
  res.render("authorsList", {
    title: "List of Authors",
    authorsList: authorsList,
  });
});

// Display detail page for a specific Author.
exports.queryByAuthorId = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;
  const [author, authorBooks] = await Promise.all([
    Author.queryByAuthorId(authorId),
    Author.queryBooksByAuthorId(authorId),
  ]);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("authorDetail", {
    author: author,
    authorBooks: authorBooks,
  });
});

exports.authorCreateGet = asyncHandler(async (req, res, next) => {
  res.render("authorForm", { title: "Create Author" });
});

// Handle Author create on POST.
exports.authorCreatePost = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("dateOfBirth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("dateOfDeath", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath ? req.body.dateOfDeath : null,
    });

    if (!errors.isEmpty()) {
      res.render("authorForm", {
        title: "Create Author",
        author: author,
        errors: errors.array(),
      });
      return;
    }

    const authorExists = await Author.queryByAuthorName({
      name: req.body.name,
    });

    if (authorExists) {
      res.redirect(`/catalog/author/${authorExists.authorId}`);
    } else {
      const data = await Author.create(author);
      res.redirect(`/catalog/author/${data.id}`);
    }
  }),
];

// Display Author delete form on GET.
exports.authorDeleteGet = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;

  const [author, allBooksByAuthor] = await Promise.all([
    Author.queryByAuthorId(authorId),
    Author.queryBooksByAuthorId(authorId),
  ]);

  if (author === null) {
    res.redirect("/catalog/authors");
  }

  res.render("authorDelete", {
    author: author,
    authorBooks: allBooksByAuthor,
  });
});

// Handle Author delete on POST.
exports.authorDeletePost = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;

  const [author, allBooksByAuthor] = await Promise.all([
    Author.queryByAuthorId(authorId),
    Author.queryBooksByAuthorId(authorId),
  ]);

  if (allBooksByAuthor.length > 0) {
    res.render("authorDelete", {
      title: "Delete Author",
      author: author,
      authorBooks: allBooksByAuthor,
    });
    return;
  } else {
    await Author.deleteByAuthorId(authorId);
    res.redirect("/catalog/authors");
  }
});

// Display Author update form on GET.
exports.authorUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

exports.authorUpdateGet = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;
  const author = await Author.queryByAuthorIdWithFormatForDateInputs(authorId);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("authorForm", {
    title: "Update Author",
    author: author,
  });
});

// Handle Author update on POST.
exports.authorUpdatePost = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("dateOfBirth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("dateOfDeath", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const authorId = req.params.id;

    let author = new Author({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath ? req.body.dateOfDeath : null,
      id: authorId,
    });

    if (!errors.isEmpty()) {
      res.render("authorForm", {
        title: "Update Author",
        author: author,
        errors: errors.array(),
      });
      return;
    }
    await Author.updateByAuthorId(author, authorId);
    author = await Author.queryByAuthorId(authorId);
    res.redirect(`/catalog/author/${author.authorId}`);
  }),
];
