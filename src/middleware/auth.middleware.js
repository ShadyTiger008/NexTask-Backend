import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(409, "Unauthorized request!");
    }

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token!");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
