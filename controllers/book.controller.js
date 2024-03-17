const Book = require("../models/book.model");
const BookInstance = require("../models/bookInstance.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");

// Display list of all books.
exports.queryAllBooks = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.queryAll();

  res.render("bookList", { title: "Book List", bookList: allBooks });
});

// Display detail page for a specific book.
exports.queryBookInstancesByBookId = asyncHandler(async (req, res, next) => {
  const bookId = req.params.id;
  const [book, bookInstances] = await Promise.all([
    Book.queryByBookId(bookId),
    BookInstance.queryBooksByBookInstanceId(bookId),
  ]);

  res.render("bookDetail", {
    title: book.title,
    book: book,
    bookInstances: bookInstances,
  });
});

// Display book create form on GET.
exports.bookCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.bookCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.bookDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.bookDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.bookUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.bookUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
