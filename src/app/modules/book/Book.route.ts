import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidation } from "./book.validations";
import { BookController } from "./book.controller";

const router = express.Router();

router.get("/:id", BookController.getSingleBook);

router.patch(
  "/:id",
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.delete("/:id", BookController.deleteBook);

router.post("/", BookController.createBook);

router.get("/", BookController.getAllBooks);

router.get("/filter", BookController.getAllFilteredBooks);

export const BookRoutes = router;
