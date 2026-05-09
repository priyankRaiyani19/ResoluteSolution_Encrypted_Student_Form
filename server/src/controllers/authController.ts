const User = require("../models/User");
const { hashPassword } = require("../utils/crypto");

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginUser = async (req: any, res: any) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        code: "INVALID_EMAIL",
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        code: "INVALID_PASSWORD",
        message:
          "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    if (user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid credentials",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to login",
    });
  }
};

const signupUser = async (req: any, res: any) => {
  try {
    const fullName = String(req.body.fullName || "").trim();
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");

    if (!fullName) {
      return res.status(400).json({
        code: "INVALID_NAME",
        message: "Full name is required",
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        code: "INVALID_EMAIL",
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        code: "INVALID_PASSWORD",
        message:
          "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        code: "USER_EXISTS",
        message:
          "This account already exists. Please login.",
      });
    }

    const createdUser = await User.create({
      fullName,
      email,
      passwordHash: hashPassword(password),
    });

    res.status(201).json({
      message: "Account created",
      user: {
        id: createdUser._id,
        fullName: createdUser.fullName,
        email: createdUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create account",
    });
  }
};

module.exports = {
  loginUser,
  signupUser,
};