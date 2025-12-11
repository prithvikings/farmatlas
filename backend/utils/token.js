import jwt from "jsonwebtoken";

export const genToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.error("JWT generation error:", error);
    return null;
  }
};
