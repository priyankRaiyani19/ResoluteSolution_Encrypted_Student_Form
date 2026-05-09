"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
//# sourceMappingURL=Student.js.map