"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { loginUser, signupUser, } = require("../controllers/authController");
const router = express.Router();
router.post("/login", loginUser);
router.post("/signup", signupUser);
module.exports = router;
//# sourceMappingURL=authRoutes.js.map