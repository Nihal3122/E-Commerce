import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const verifyjwt = async (req, res, next) => {
  try {
    const token = req?.cookies?.token || req.headers["token"];

    if (!token) {
      return res.json({
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken?._id;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
