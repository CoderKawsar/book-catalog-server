import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import { ObjectId } from "mongodb";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    wishList: {
      type: [{ type: ObjectId, ref: "Book" }],
      required: false,
    },
    booksReading: {
      type: [{ type: ObjectId, ref: "Book" }],
      required: false,
    },
    finishedReading: {
      type: [{ type: ObjectId, ref: "Book" }],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = model("User", UserSchema);
