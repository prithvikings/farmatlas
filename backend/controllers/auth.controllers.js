//auth.controllers.js

import bcrypt from "bcrypt";
import { User, Farm } from "../models/index.js";
import { genToken } from "../utils/token.js";
import { sendOtpMail } from "../utils/index.js";

export const signUp = async (req, res, next) => {
  try {
    let { name, email, password, farmName } = req.body;

    // Normalize input
    email = email.trim().toLowerCase();
    farmName = farmName.trim().toLowerCase();

    // Validate fields
    if (!name || !email || !password || !farmName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    if (farmName.length < 3) {
      return res.status(400).json({
        message: "Farm name must be at least 3 characters long.",
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Check if farm exists
    const existingFarm = await Farm.findOne({ farmName });
    if (existingFarm) {
      return res.status(400).json({ message: "Farm name already taken." });
    }

    // Create farm without owner first
    const farm = await Farm.create({ farmName });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      farmId: farm._id,
    });

    // Assign owner
    farm.owner = admin._id;
    await farm.save();

    // Generate token (CORRECT PAYLOAD)
    const token = genToken({
      userId: admin._id.toString(),
      role: admin.role,
      farmId: farm._id.toString(),
    });

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Admin account created successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        farmId: admin.farmId,
      },
    });
  } catch (error) {
    next(error); // Let global error handler shape response
  }
};

export const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Normalize email
    email = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT with multi-tenant payload
    const token = genToken({
      userId: user._id.toString(),
      role: user.role,
      farmId: user.farmId.toString(),
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send safe user info
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        farmId: user.farmId,
      },
    });
  } catch (error) {
    console.error("signIn error:", error);
    return res.status(500).json({
      message: "Signin error",
      error: error.message,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
    return res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    return res.status(500).json(`sign out error ${error}`);
  }
};


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({ message: "otp sent successfully" });
  } catch (error) {
    return res.status(500).json(`send otp error ${error}`);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "invalid/expired otp" });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "otp verify successfully" });
  } catch (error) {
    return res.status(500).json(`verify otp error ${error}`);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "otp verification required" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    return res.status(500).json(`reset password error ${error}`);
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
      });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`googleAuth error ${error}`);
  }
};
