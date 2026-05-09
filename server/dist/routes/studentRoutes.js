"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { getStudents, createStudent, updateStudent, deleteStudent, getCourses, } = require("../controllers/studentController");
const router = express.Router();
router.get("/students", getStudents);
router.get("/courses", getCourses);
router.post("/register", createStudent);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);
module.exports = router;
//# sourceMappingURL=studentRoutes.js.map