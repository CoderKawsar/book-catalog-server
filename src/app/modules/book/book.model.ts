import { Schema, Types, model } from "mongoose";
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
      type: Date,
      required: true,
    },
    reviews: [
      {
        type: String,
      },
    ],
    addedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.index({ title: 1, author: 1, publicationDate: 1 }, { unique: true });

export const Book = model<IBook, BookModel>("Book", BookSchema);
