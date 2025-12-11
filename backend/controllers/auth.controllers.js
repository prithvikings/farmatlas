import User from "../models/user.models.js";
import bcrypt, { hash } from "bcrypt";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";
import Farm from "../models/farm.models.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Farm from "../models/farm.model.js";

export const signUp = async (req, res) => {
  try {
    let { name, email, password, farmName } = req.body;

    // Normalize input
    email = email.trim().toLowerCase();
    farmName = farmName.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Check password length
    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // Check farm name uniqueness
    const existingFarm = await Farm.findOne({ farmName });
    if (existingFarm) {
      return res.status(400).json({ message: "Farm name already taken." });
    }

    // Create Farm FIRST (no owner yet)
    const farm = await Farm.create({ farmName });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin user and attach farmId
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      farmId: farm._id,
    });

    // Set farm owner
    farm.owner = admin._id;
    await farm.save();

    // Generate JWT with full multi-tenant payload
    const token = genToken({
      userId: admin._id,
      role: admin.role,
      farmId: farm._id,
    });

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // set true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send safe admin payload
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
    return res.status(500).json({
      message: "Signup error",
      error: error.message,
    });
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
      userId: user._id,
      role: user.role,
      farmId: user.farmId,
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
    res.clearCookie("token");
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
