import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get("/:email", UserController.getUserByEmail);

router.patch("/add-book-to-wishlist", UserController.addBookToWishList);

router.patch("/add-book-to-reading", UserController.addBookToReading);

router.patch(
  "/add-book-to-finished-reading",
  UserController.addBookToFinishedReading
);

export const UserRoutes = router;
