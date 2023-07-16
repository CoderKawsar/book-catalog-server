import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const auth =
  () =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    {
      try {
        // get authorization token
        const token = req.cookies.accessToken;

        // if token not found
        if (!token) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized!"
          );
        }

        // verify token
        let verifiedUser: JwtPayload;
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret
        );

        req.user = verifiedUser;

        if (verifiedUser.email) {
          next();
        } else {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized!"
          );
        }
      } catch (error) {
        next(error);
      }
    }
  };

export default auth;
