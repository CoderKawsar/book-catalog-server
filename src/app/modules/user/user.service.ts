import httpStatus from "http-status";
import mongoose from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { User } from "../user/user.model";
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./user.interface";

const createUser = async (userInput: IUser) => {
  const result = await User.create(userInput);
  const { password, ...user } = result.toObject();

  // create json web token
  const { _id, email: userEmail } = user;

  const accessToken = jwtHelpers.createToken(
    {
      _id,
      email: userEmail,
    },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );

  // create refresh web token
  const refreshToken = jwtHelpers.createToken(
    {
      _id,
      email: userEmail,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expiresIn as string
  );

  return { user, accessToken, refreshToken };
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const user = await User.findOne({ email: email }).select("email password");

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user?.password as string
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // create json web token
  const { _id, email: userEmail } = user;

  const accessToken = jwtHelpers.createToken(
    {
      _id,
      email: userEmail,
    },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );

  // create refresh web token
  const refreshToken = jwtHelpers.createToken(
    {
      _id,
      email: userEmail,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expiresIn as string
  );

  return { accessToken, refreshToken };
};

const changePassword = async (
  user: JwtPayload | null,
  passwordData: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = passwordData;

  // checking if the user exists anymore
  const userC = new User();
  const existedUser = await userC.isUserExists(user?.email);

  if (!existedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // checking old password
  const isPasswordMatched = await userC.isPasswordMatched(
    oldPassword,
    existedUser?.password as string
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // hash password before saving
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  // update password
  const query = { email: user?.email };
  const updatedData = {
    password: newHashedPassword,
  };
  await User.findOneAndUpdate(query, updatedData);
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken: JwtPayload;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  const { email } = verifiedToken;

  // checking if the user exists anymore
  const user = new User();
  const isUserExist = await user.isUserExists(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist!");
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist?.email,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expiresIn as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const UserService = {
  createUser,
  loginUser,
  changePassword,
  refreshToken,
};
