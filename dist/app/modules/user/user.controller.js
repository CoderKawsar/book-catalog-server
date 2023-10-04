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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.createUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "user created successfully!",
        data: result,
    });
}));
const getUserByEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield user_service_1.UserService.getUserByEmail(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User fetched successfully!",
        data: result,
    });
}));
const addBookToWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, bookId } = req.body;
    const result = yield user_service_1.UserService.addBookToWishList(userEmail, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: (result === null || result === void 0 ? void 0 : result.message) || "Book added to wishlist!",
        data: result,
    });
}));
const addBookToReading = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, bookId } = req.body;
    const result = yield user_service_1.UserService.addBookToReading(userEmail, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: (result === null || result === void 0 ? void 0 : result.message) || "Book added to reading list!",
        data: result,
    });
}));
const addBookToFinishedReading = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, bookId } = req.body;
    const result = yield user_service_1.UserService.addBookToFinishedReading(userEmail, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: (result === null || result === void 0 ? void 0 : result.message) || "Book added to finished reading list!",
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getUserByEmail,
    addBookToWishList,
    addBookToReading,
    addBookToFinishedReading,
};
