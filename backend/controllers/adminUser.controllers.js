//adminUser.controllers.js

import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export const createUserByAdmin = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    email = email.trim().toLowerCase();

    // Hard stop: Admin cannot create Admin
    if (role === "ADMIN") {
      return res.status(403).json({
        message: "Admins cannot create other admins",
      });
    }

    // Allowed roles only
    if (!["WORKER", "VET"].includes(role)) {
      return res.status(400).json({
        message: "Only WORKER or VET can be created",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      farmId: req.user.farmId, // 🔥 tenant isolation
    });

    return res.status(201).json({
      message: `${role} created successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("createUserByAdmin error:", error);
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};


export const getUsersByFarm = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const users = await User.find({ farmId })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};