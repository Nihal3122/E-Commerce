import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords and confirm password do not match.",
        success: false,
      });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(409).json({
        message: "User with email already exists",
        success: false,
      });
    }
    const profilePicLocalPath = req?.file?.path;

    console.log("profilePicLocalPath", profilePicLocalPath);

    const profilePic = await uploadOnCloudinary(profilePicLocalPath);

    if (!profilePic) {
      return res.status(409).json({
        message: "Profile Photo is requried",
        success: false,
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "GENERAL",
      profilePic: profilePic.url,
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User nor found",
        success: false,
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credential",
        success: false,
      });
    }

    const tokenData = {
      _id: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 8,
    });

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    return res.cookie("token", token, tokenOption).json({
      success: true,
      message: "User login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "User logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.json({
      message: "User logout successfully",
      success: true,
      allUser,
    });
    res;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const sessionUser = req.user
    const { userId, email, name, role } = req.body;
    const paylad = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    const user = await User.findById(sessionUser)
    console.log("Userrole",user)
   
    const updateUser = await User.findByIdAndUpdate(userId, paylad);

    res.json({
      message: "User updated",
      success: true,
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
