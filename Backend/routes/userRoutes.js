import express from "express";
import {
  getAllUser,
  getCurrentUser,
  updateUser,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController.js";
import { verifyjwt } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// user routes
router.post("/register", upload.single("profilePic"), userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);
router.route("/getalluser").get(getAllUser);
router.route("/userdetails").get(verifyjwt, getCurrentUser);
router.route("/update-user").post(verifyjwt, updateUser);




export default router;
