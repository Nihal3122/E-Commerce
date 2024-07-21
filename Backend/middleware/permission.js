import { User } from "../models/userModel.js";

export const uploadeProductPermission = async (userId) => {
  const user = await User.findById(userId);
  if (user.role !== "ADMIN") {
    return false;
  }
  return true;
};
