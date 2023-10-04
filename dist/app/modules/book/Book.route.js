"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validations_1 = require("./book.validations");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.get("/:id", book_controller_1.BookController.getSingleBook);
router.patch("/:id", (0, validateRequest_1.default)(book_validations_1.BookValidation.updateBookZodSchema), book_controller_1.BookController.updateBook);
router.delete("/:id", book_controller_1.BookController.deleteBook);
router.post("/", book_controller_1.BookController.createBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/filter", book_controller_1.BookController.getAllFilteredBooks);
exports.BookRoutes = router;
