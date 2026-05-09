import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import type { Student } from "../types/student";
import { encryptData } from "../utils/crypto";
import { API_ENDPOINTS } from "../utils/api";

interface Props {
  fetchStudents: () => void;
  selectedStudent: Student | null;
  clearSelectedStudent: () => void;
}

const initialState: Student = {
  fullName: "",
  email: "",
  phoneNumber: 0,
  dateOfBirth: "",
  gender: "",
  address: "",
  courseEnrolled: "",
  password: "",
};

const REQUIRED_FIELD_LABELS = {
  fullName: "Full Name",
  email: "Email",
  phoneNumber: "Phone Number",
  dateOfBirth: "Date Of Birth",
  gender: "Gender",
  address: "Address",
  courseEnrolled: "Course Enrolled",
  password: "Account Password",
} as const;

const StudentForm = ({
  fetchStudents,
  selectedStudent,
  clearSelectedStudent,
}: Props) => {
  const [formData, setFormData] =
    useState<Student>(
      initialState
    );

  const [courses, setCourses] =
    useState<string[]>([]);

  const [showPassword, setShowPassword] =
    useState(false);

  const resetForm = () => {
    clearSelectedStudent();
    setFormData(initialState);
  };

  useEffect(() => {
    if (selectedStudent) {
      setFormData(
        selectedStudent
      );
    } else {
      setFormData(
        initialState
      );
    }
  }, [selectedStudent]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response =
          await axios.get<
            string[]
          >(API_ENDPOINTS.courses);

        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);

  const changeHandler = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    if (
      name === "phoneNumber"
    ) {
      const digitsOnly =
        value
          .replace(/\D/g, "")
          .slice(0, 10);

      setFormData({
        ...formData,
        phoneNumber:
          digitsOnly
            ? Number(
                digitsOnly
              )
            : 0,
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const missingField = Object.entries(
      REQUIRED_FIELD_LABELS
    ).find(([key]) => {
      const value =
        formData[
          key as keyof Student
        ];

      return String(value || "")
        .trim()
        .length === 0;
    });

    if (missingField) {
      toast.error(`${missingField[1]} is required`);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Email format is not match");
      return;
    }

    const phoneAsText =
      String(
        formData.phoneNumber || ""
      );

    if (!/^\d{10}$/.test(phoneAsText)) {
      toast.error("Enter valid mobile number");
      return;
    }

    try {
      const encryptedData =
        encryptData(formData);

      if (
        selectedStudent?._id
      ) {
        await axios.put(
          API_ENDPOINTS.student(
            selectedStudent._id
          ),
          {
            data: encryptedData,
          }
        );

        toast.success("Student Updated");
      } else {
        await axios.post(
          API_ENDPOINTS.register,
          {
            data: encryptedData,
          }
        );

        toast.success("Student Created");
      }

      fetchStudents();

      resetForm();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <form
      className="panel space-y-6 px-6 py-6 text-left sm:px-7"
      onSubmit={submitHandler}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-coral-500">
            Student Intake
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink-950">
            {selectedStudent
              ? "Update student details"
              : "Register a new student"}
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-ink-700">
            Capture enrollment details in one pass. Sensitive fields remain encrypted before they leave the client.
          </p>
        </div>

        {selectedStudent ? (
          <button
            className="secondary-button"
            type="button"
            onClick={resetForm}
          >
            Cancel edit
          </button>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fullName">
            Full Name *
          </label>

          <input
            className="field"
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Jordan Miles"
            value={formData.fullName}
            onChange={changeHandler}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="email">
            Email *
          </label>

          <input
            className="field"
            id="email"
            type="email"
            name="email"
            placeholder="student@example.edu"
            value={formData.email}
            onChange={changeHandler}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="phoneNumber">
            Phone Number *
          </label>

          <input
            className="field"
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            placeholder="9876543210"
            inputMode="numeric"
            maxLength={10}
            minLength={10}
            pattern="[0-9]{10}"
            value={
              formData.phoneNumber || ""
            }
            onChange={changeHandler}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="dateOfBirth">
            Date Of Birth *
          </label>

          <input
            className="field"
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={
              formData.dateOfBirth
            }
            onChange={changeHandler}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="gender">
            Gender *
          </label>

          <select
            className="field"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={changeHandler}
            required
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="courseEnrolled">
            Course Enrolled *
          </label>

          <select
            className="field"
            id="courseEnrolled"
            name="courseEnrolled"
            value={
              formData.courseEnrolled
            }
            onChange={changeHandler}
            required
          >
            <option value="">
              Select Course
            </option>

            {courses.map(
              (course) => (
                <option
                  key={course}
                  value={course}
                >
                  {course}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="address">
          Address *
        </label>

        <textarea
          className="field min-h-28 resize-y"
          id="address"
          name="address"
          placeholder="Full address"
          value={formData.address}
          onChange={changeHandler}
          required
        />
      </div>

      <div>
        <label className="label" htmlFor="password">
          Account Password *
        </label>

        <div className="flex gap-2">
          <input
            className="field"
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={changeHandler}
            required
          />

          <button
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="secondary-button px-4"
            type="button"
            onClick={() =>
              setShowPassword(
                (previous) => !previous
              )
            }
          >
            {showPassword ? (
              <FiEyeOff size={18} />
            ) : (
              <FiEye size={18} />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-sand-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-sm leading-6 text-ink-700">
          {selectedStudent
            ? "Editing an existing record. Saving will overwrite the encrypted payload for this student."
            : "New submissions create an encrypted student record and refresh the live roster below."}
        </p>

        <button className="primary-button" type="submit">
          {selectedStudent
            ? "Update Student"
            : "Create Student"}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;