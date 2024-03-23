const BookInstance = require("../models/bookInstance.model");
const Book = require("../models/book.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");
const { body, validationResult } = require("express-validator");

// Display list of all BookInstances.
exports.queryAllBookInstances = asyncHandler(async (req, res, next) => {
  const bookInstancesList = await BookInstance.queryAll();
  res.render("bookInstancesList", {
    title: "Book Instances List",
    bookInstancesList: bookInstancesList,
  });
});

// Display detail page for a specific BookInstance.
exports.queryByBookInstanceId = asyncHandler(async (req, res, next) => {
  const bookInstanceId = req.params.id;
  const bookInstance = await BookInstance.queryByBookInstanceId(bookInstanceId);

  res.render("bookInstanceDetail", {
    title: `Book: ${bookInstance.title}`,
    bookInstance: bookInstance,
  });
});

// Display bookInstance create form on GET.
exports.bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.queryAll();

  res.render("bookInstanceForm", {
    title: "Create BookInstance",
    bookList: allBooks,
  });
});

// Handle bookInstance create on POST.
exports.bookInstanceCreatePost = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("dueDate", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      bookId: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      dueDate: req.body.dueDate ? req.body.dueDate : null,
    });

    const book = await Book.queryByBookId(bookInstance.bookId);
    bookInstance.title = book.title;

    if (errors.isEmpty()) {
      const newBookInstance = await BookInstance.create(bookInstance);
      res.redirect(`/catalog/bookInstance/${newBookInstance.id}`);
    } else {
      const allBooks = await Book.queryAll();

      res.render("bookInstanceForm", {
        title: "Create BookInstance",
        bookList: allBooks,
        selectedBook: bookInstance.bookId,
        errors: errors.array(),
        bookInstance: bookInstance,
      });
      return;
    }
  }),
];

exports.bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
  const bookInstanceId = req.params.id;
  const bookInstance = await BookInstance.queryByBookInstanceId(bookInstanceId);

  if (bookInstance === null) res.redirect("/catalog/bookInstances");

  res.render("bookInstanceDelete", {
    bookInstance: bookInstance,
  });
});

exports.bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
  const bookInstanceId = req.params.id;
  const bookInstance = await BookInstance.queryByBookInstanceId(bookInstanceId);

  if (!bookInstance) {
    res.render("bookInstanceDelete", {
      title: "Delete Book Instance",
      bookInstance: bookInstance,
    });
    return;
  } else {
    await BookInstance.deleteByBookInstanceId(bookInstanceId);
    res.redirect("/catalog/bookInstances");
  }
});

// Display bookInstance update form on GET.
exports.bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookInstance update on POST.
exports.bookInstanceUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
