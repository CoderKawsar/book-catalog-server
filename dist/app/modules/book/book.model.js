"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true,
    },
    reviews: [
        {
            reviewerEmail: {
                type: String,
                required: false,
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
        },
    ],
    addedBy: {
        type: String,
    },
}, {
    timestamps: true,
});
BookSchema.index({ title: 1, author: 1, publicationDate: 1 }, { unique: true });
exports.Book = (0, mongoose_1.model)("Book", BookSchema);
