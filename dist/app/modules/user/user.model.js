"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    wishList: {
        type: [{ type: mongodb_1.ObjectId, ref: "Book" }],
        required: false,
    },
    booksReading: {
        type: [{ type: mongodb_1.ObjectId, ref: "Book" }],
        required: false,
    },
    finishedReading: {
        type: [{ type: mongodb_1.ObjectId, ref: "Book" }],
        required: false,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
