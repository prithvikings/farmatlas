import { User } from "../models/index.js";

import { getProfileCompletion } from "../utils/profileCompletion.js";

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const completion = getProfileCompletion(user);

  res.json({
    ...user.toObject(),
    profileCompletion: completion,
  });
};


export const updateMyProfile = async (req, res) => {
  const allowedUpdates = [
    "name",
    "profile.phone",
    "profile.address",
    "profile.city",
    "profile.state",
    "profile.country",
    "profile.experienceYears",
    "profile.specialization",
    "profile.assignedSection",
    "profile.emergencyContact",
    "profile.bio",
    "profile.avatar",
  ];

  const updates = {};

  for (const key of allowedUpdates) {
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      if (req.body[parent]?.[child] !== undefined) {
        updates[`${parent}.${child}`] = req.body[parent][child];
      }
    } else if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user.userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select("-password");

  res.json({
    message: "Profile updated successfully",
    user,
  });
};
