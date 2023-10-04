import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  email: string;
  wishList?: ObjectId[];
  booksReading?: ObjectId[];
  finishedReading?: ObjectId[];
}
