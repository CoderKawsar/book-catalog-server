import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interfaces";

const BookSchema = new Schema<IBook, BookModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

BookSchema.index({ title: 1, author: 1, publicationDate: 1 }, { unique: true });

export const Book = model<IBook, BookModel>("Book", BookSchema);
