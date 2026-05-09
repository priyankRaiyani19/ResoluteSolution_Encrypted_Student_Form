"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Student = require("../models/Student");
const STATIC_COURSES = [
    "Computer Science",
    "Information Technology",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Business Administration",
    "Data Science",
    "Civil Engineering",
];
const getStudents = async (_req, res) => {
    try {
        const students = await Student.find().sort({
            createdAt: -1,
        });
        res.json(students);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to load students",
        });
    }
};
const createStudent = async (req, res) => {
    try {
        const student = await Student.create({
            data: req.body.data,
        });
        res.status(201).json(student);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create student",
        });
    }
};
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, {
            data: req.body.data,
        }, { new: true });
        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }
        res.json(student);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update student",
        });
    }
};
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }
        res.json({
            message: "Student deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete student",
        });
    }
};
const getCourses = (_req, res) => {
    res.json(STATIC_COURSES);
};
module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getCourses,
};
//# sourceMappingURL=studentController.js.map