import t_Login from "../models/Login.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generatetoken.js";
import { z } from "zod";

// Define a schema for validating the request body
const loginSchema = z.object({
  f_userName: z.string(),
  f_Pwd: z.string(),
});

export const login = async (req, res) => {
  try {
    // Validate the request body against the schema
    const { f_userName, f_Pwd } = loginSchema.parse(req.body);

    if (!f_userName || !f_Pwd) {
      return res
        .status(400)
        .json({ error: "Both username and password are required" });
    }

    const user = await t_Login.findOne({ f_userName });

    // If user not found or password is incorrect
    if (!user || !(await bcrypt.compare(f_Pwd, user.f_Pwd))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Send success response with user ID and username
    res.status(200).json({
      _id: user._id,
      username: user.f_userName,
    });
  } catch (error) {
    // Check if the error is due to validation failure
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    }

    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    // Clear JWT cookie
    res
      .clearCookie("jwt")
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
