"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.get("/:email", user_controller_1.UserController.getUserByEmail);
router.patch("/add-book-to-wishlist", user_controller_1.UserController.addBookToWishList);
router.patch("/add-book-to-reading", user_controller_1.UserController.addBookToReading);
router.patch("/add-book-to-finished-reading", user_controller_1.UserController.addBookToFinishedReading);
exports.UserRoutes = router;
