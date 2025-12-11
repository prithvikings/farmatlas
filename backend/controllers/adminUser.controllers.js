//adminUser.controllers.js

import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export const createUserByAdmin = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // Normalize email
    email = email.trim().toLowerCase();

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Restrict allowed roles
    const allowedRoles = ["WORKER", "VET", "ADMIN"];

    if (!allowedRoles.includes(role.toUpperCase())) {
      return res.status(400).json({
        message: "Invalid role. Only WORKER or VET can be created by admin.",
      });
    }

    // Check duplicate email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Validate password strength
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    // Farm assignment (critical for multi-farm)
    const farmId = req.user.farmId;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role.toUpperCase(),
      farmId,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        farmId: user.farmId,
      },
    });
  } catch (error) {
    console.error("createUserByAdmin error:", error);
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};
