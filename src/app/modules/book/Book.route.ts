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
  auth(),
  BookController.updateBook
);

router.delete("/:id", auth(), BookController.deleteBook);

router.post("/", auth(), BookController.createBook);

router.get("/", BookController.getAllBooks);

export const BookRoutes = router;
