/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

type fullName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  name: fullName;
  email: string;
  password: string;
};

export type IUserMethods = {
  isUserExists(email: string): Promise<Partial<IUser | null>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
