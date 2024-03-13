var express = require("express");
const bookInstanceController = require("../controllers/bookInstance.controller.js");
const { asyncHandler } = require("../utils/asyncErrorHandler.js");
var router = express.Router();

router.get(
  "/bookinstance/create",
  bookInstanceController.bookInstanceCreateGet
);

// POST request for creating BookInstance.
router.post(
  "/bookinstance/create",
  bookInstanceController.bookInstanceCreatePost
);

// GET request to delete BookInstance.
router.get(
  "/bookinstance/:id/delete",
  bookInstanceController.bookInstanceDeleteGet
);

// POST request to delete BookInstance.
router.post(
  "/bookinstance/:id/delete",
  bookInstanceController.bookInstanceDeletePost
);

// GET request to update BookInstance.
router.get(
  "/bookinstance/:id/update",
  bookInstanceController.bookInstanceUpdateGet
);

// POST request to update BookInstance.
router.post(
  "/bookinstance/:id/update",
  bookInstanceController.bookInstanceUpdatePost
);

// GET request for one BookInstance.
router.get("/bookinstance/:id", bookInstanceController.queryByBookInstanceId);

// GET request for list of all BookInstance.
router.get("/bookinstances", bookInstanceController.queryAllBookInstances);

module.exports = router;
