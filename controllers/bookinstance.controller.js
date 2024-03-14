const BookInstance = require("../models/bookinstance.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");

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
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
});

// Display bookInstance create form on GET.
exports.bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
});

// Handle bookInstance create on POST.
exports.bookInstanceCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
});

// Display bookInstance delete form on GET.
exports.bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle bookInstance delete on POST.
exports.bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display bookInstance update form on GET.
exports.bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookInstance update on POST.
exports.bookInstanceUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
