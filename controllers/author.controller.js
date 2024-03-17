const Author = require("../models/author.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");

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

// Display Author create form on GET.
exports.authorCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create GET");
});

// Handle Author create on POST.
exports.authorCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});

// Display Author delete form on GET.
exports.authorDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

// Handle Author delete on POST.
exports.authorDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.authorUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.authorUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
