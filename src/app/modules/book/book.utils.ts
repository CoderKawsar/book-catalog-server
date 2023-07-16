import { Request } from "express";
import { Book } from "./book.model";
import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

export const isAuthorizedUserToModifyBook = async (
  req: Request,
  bookId: string
) => {
  // verify user
  const authenticatedUserEmail = req?.user?.email;

  const book = await Book.findById(bookId).select("addedBy");
  let adderEmail: string;
  if (book) {
    const addedBy = book.addedBy;
    const adder = await User.findById(addedBy);
    if (adder) {
      adderEmail = adder.email;
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }

  if (authenticatedUserEmail !== adderEmail) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }
};
