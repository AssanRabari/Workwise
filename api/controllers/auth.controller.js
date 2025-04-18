import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 5);

    const newUser = new User({
      ...rest,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User has been created." });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password: inputPassword } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordValid = bcrypt.compareSync(inputPassword, user.password);
    if (!isPasswordValid) {
      return next(createError(400, "Wrong password or username!"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...userInfo } = user._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "User has been logged out." });
  } catch (error) {
    res.status(500).json({ message: "Logout failed.", error });
  }
};
