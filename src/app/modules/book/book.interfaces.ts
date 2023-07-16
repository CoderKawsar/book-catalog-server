import mongoose, { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  reviews: string[];
  addedBy: mongoose.Types.ObjectId | IUser;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
};
