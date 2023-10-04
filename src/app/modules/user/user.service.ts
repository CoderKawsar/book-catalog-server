import { IUser } from "./user.interface";
import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

/*===========================================================================
Create User
===========================================================================*/
const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

/*===========================================================================
Get User By Email
===========================================================================*/
const getUserByEmail = async (email: string) => {
  const user = await User.findOne({
    email,
  })
    .populate("wishList")
    .populate("booksReading")
    .populate("finishedReading");

  return user;
};

/*===========================================================================
Add Book To Wish List
===========================================================================*/
const addBookToWishList = async (userEmail: string, bookId: string) => {
  const user = await User.findOne({
    email: userEmail,
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const alreadyExistsInWishlist = user.wishList?.find(
    (book) => book.toString() === bookId
  );
  const alreadyExistsInReading = user.booksReading?.find(
    (book) => book.toString() === bookId
  );

  if (alreadyExistsInWishlist) {
    return { message: "Already in your wishlist!" };
  } else if (alreadyExistsInReading) {
    return { message: "Currently reading this book!" };
  } else {
    const result = await User.updateOne(
      { _id: user._id },
      { $push: { wishList: bookId } }
    );
    if (result.acknowledged) {
      const updatedUser = await User.findOne({ email: userEmail })
        .populate("wishList")
        .populate("booksReading")
        .populate("finishedReading");

      return updatedUser;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Error occured!");
    }
  }
};

/*===========================================================================
Add Book To Reading List
===========================================================================*/
const addBookToReading = async (userEmail: string, bookId: string) => {
  const user = await User.findOne({
    email: userEmail,
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // check if the book is already present in booksReading
  const alreadyReading = user.booksReading?.find(
    (book) => book.toString() === bookId
  );

  // remove book from wishList if already there
  user.wishList = user.wishList?.filter((book) => book.toString() !== bookId);

  // remove book from finished reading if already there
  user.wishList = user.finishedReading?.filter(
    (book) => book.toString() !== bookId
  );

  if (alreadyReading) {
    return { message: "Currently reading this book!" };
  } else {
    await user.save();

    const result = await User.updateOne(
      { _id: user._id },
      { $push: { booksReading: bookId } }
    );
    if (result.acknowledged) {
      const updatedUser = await User.findOne({ email: userEmail })
        .populate("wishList")
        .populate("booksReading")
        .populate("finishedReading");

      return updatedUser;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Error occured!");
    }
  }
};

/*===========================================================================
Add Book To Finished Reading List
===========================================================================*/
const addBookToFinishedReading = async (userEmail: string, bookId: string) => {
  const user = await User.findOne({
    email: userEmail,
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // check if the book is already present in finished reading
  const alreadyFinishedReading = user.finishedReading?.find(
    (book) => book.toString() === bookId
  );

  // remove book from wishList if already there
  user.wishList = user.wishList?.filter((book) => book.toString() !== bookId);

  // remove book from reading list if already there
  user.booksReading = user.booksReading?.filter(
    (book) => book.toString() !== bookId
  );

  if (alreadyFinishedReading) {
    await user.save();
    return { message: "Already finished reading this book!" };
  } else {
    await user.save();

    const result = await User.updateOne(
      { _id: user._id },
      { $push: { finishedReading: bookId } }
    );

    if (result.acknowledged) {
      const updatedUser = await User.findOne({ email: userEmail })
        .populate("wishList")
        .populate("booksReading")
        .populate("finishedReading");

      return updatedUser;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Error occured!");
    }
  }
};

export const UserService = {
  createUser,
  getUserByEmail,
  addBookToWishList,
  addBookToReading,
  addBookToFinishedReading,
};
