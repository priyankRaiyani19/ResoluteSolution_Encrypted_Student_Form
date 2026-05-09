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

const getStudents = async (_req: any, res: any) => {
	try {
		const students = await Student.find().sort({
			createdAt: -1,
		});

		res.json(students);
	} catch (error) {
		res.status(500).json({
			message: "Failed to load students",
		});
	}
};

const createStudent = async (req: any, res: any) => {
	try {
		const student = await Student.create({
			data: req.body.data,
		});

		res.status(201).json(student);
	} catch (error) {
		res.status(500).json({
			message: "Failed to create student",
		});
	}
};

const updateStudent = async (req: any, res: any) => {
	try {
		const student = await Student.findByIdAndUpdate(
			req.params.id,
			{
				data: req.body.data,
			},
			{ new: true }
		);

		if (!student) {
			return res.status(404).json({
				message: "Student not found",
			});
		}

		res.json(student);
	} catch (error) {
		res.status(500).json({
			message: "Failed to update student",
		});
	}
};

const deleteStudent = async (req: any, res: any) => {
	try {
		const student = await Student.findByIdAndDelete(
			req.params.id
		);

		if (!student) {
			return res.status(404).json({
				message: "Student not found",
			});
		}

		res.json({
			message: "Student deleted",
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete student",
		});
	}
};

const getCourses = (_req: any, res: any) => {
	res.json(STATIC_COURSES);
};

module.exports = {
	getStudents,
	createStudent,
	updateStudent,
	deleteStudent,
	getCourses,
};
