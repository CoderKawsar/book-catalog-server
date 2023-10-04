import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { IBook } from "../book/book.interfaces";
import { IUser } from "./user.interface";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user created successfully!",
      data: result,
    });
  }
);

const getUserByEmail: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.params;
    const result = await UserService.getUserByEmail(email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  }
);

const addBookToWishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userEmail, bookId } = req.body;
    const result = await UserService.addBookToWishList(userEmail, bookId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result?.message || "Book added to wishlist!",
      data: result,
    });
  }
);

const addBookToReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userEmail, bookId } = req.body;
    const result = await UserService.addBookToReading(userEmail, bookId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result?.message || "Book added to reading list!",
      data: result,
    });
  }
);

const addBookToFinishedReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userEmail, bookId } = req.body;
    const result = await UserService.addBookToFinishedReading(
      userEmail,
      bookId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result?.message || "Book added to finished reading list!",
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  getUserByEmail,
  addBookToWishList,
  addBookToReading,
  addBookToFinishedReading,
};
