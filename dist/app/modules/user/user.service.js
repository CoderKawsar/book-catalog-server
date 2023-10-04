"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../user/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
/*===========================================================================
Create User
===========================================================================*/
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
/*===========================================================================
Get User By Email
===========================================================================*/
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email,
    })
        .populate("wishList")
        .populate("booksReading")
        .populate("finishedReading");
    return user;
});
/*===========================================================================
Add Book To Wish List
===========================================================================*/
const addBookToWishList = (userEmail, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield user_model_1.User.findOne({
        email: userEmail,
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const alreadyExistsInWishlist = (_a = user.wishList) === null || _a === void 0 ? void 0 : _a.find((book) => book.toString() === bookId);
    const alreadyExistsInReading = (_b = user.booksReading) === null || _b === void 0 ? void 0 : _b.find((book) => book.toString() === bookId);
    if (alreadyExistsInWishlist) {
        return { success: false, message: "Already in your wishlist!" };
    }
    else if (alreadyExistsInReading) {
        return { success: false, message: "Currently reading this book!" };
    }
    else {
        const result = yield user_model_1.User.updateOne({ _id: user._id }, { $push: { wishList: bookId } });
        if (result.acknowledged) {
            return { success: true, message: "Book added to wishlist!" };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Error occured!");
        }
    }
});
/*===========================================================================
Add Book To Reading List
===========================================================================*/
const addBookToReading = (userEmail, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const user = yield user_model_1.User.findOne({
        email: userEmail,
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // check if the book is already present in booksReading
    const alreadyReading = (_c = user.booksReading) === null || _c === void 0 ? void 0 : _c.find((book) => book.toString() === bookId);
    // remove book from wishList if already there
    user.wishList = (_d = user.wishList) === null || _d === void 0 ? void 0 : _d.filter((book) => book.toString() !== bookId);
    // remove book from finished reading if already there
    user.wishList = (_e = user.finishedReading) === null || _e === void 0 ? void 0 : _e.filter((book) => book.toString() !== bookId);
    if (alreadyReading) {
        return { success: false, message: "Currently reading this book!" };
    }
    else {
        yield user.save();
        const result = yield user_model_1.User.updateOne({ _id: user._id }, { $push: { booksReading: bookId } });
        if (result.acknowledged) {
            return { success: true, message: "Book added to reading list!" };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Error occured!");
        }
    }
});
/*===========================================================================
Add Book To Finished Reading List
===========================================================================*/
const addBookToFinishedReading = (userEmail, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    const user = yield user_model_1.User.findOne({
        email: userEmail,
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // check if the book is already present in finished reading
    const alreadyFinishedReading = (_f = user.finishedReading) === null || _f === void 0 ? void 0 : _f.find((book) => book.toString() === bookId);
    // remove book from wishList if already there
    user.wishList = (_g = user.wishList) === null || _g === void 0 ? void 0 : _g.filter((book) => book.toString() !== bookId);
    // remove book from reading list if already there
    user.booksReading = (_h = user.booksReading) === null || _h === void 0 ? void 0 : _h.filter((book) => book.toString() !== bookId);
    if (alreadyFinishedReading) {
        yield user.save();
        return { success: false, message: "Already finished reading this book!" };
    }
    else {
        yield user.save();
        const result = yield user_model_1.User.updateOne({ _id: user._id }, { $push: { finishedReading: bookId } });
        if (result.acknowledged) {
            return { success: true, message: "Book added to finished reading list!" };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Error occured!");
        }
    }
});
exports.UserService = {
    createUser,
    getUserByEmail,
    addBookToWishList,
    addBookToReading,
    addBookToFinishedReading,
};
