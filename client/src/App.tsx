import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';

import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

import type { Student } from "./types/student";

import {
  decryptData,
} from "./utils/crypto";
import { API_ENDPOINTS } from "./utils/api";

interface StudentApiRecord {
  _id: string;
  data: string;
}

const App = () => {
  const [students, setStudents] =
    useState<Student[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [activeView, setActiveView] =
    useState<"form" | "list">(
      "form"
    );

  const [
    selectedStudent,
    setSelectedStudent,
  ] =
    useState<Student | null>(
      null
    );

  const fetchStudents =
    async () => {
      setIsLoading(true);

      try {
        const response =
          await axios.get<
            StudentApiRecord[]
          >(API_ENDPOINTS.students);

        const decryptedStudents =
          response.data.map(
            (
              student
            ) => ({
              _id:
                student._id,
              ...decryptData(
                student.data
              ),
            })
          );

        setStudents(
          decryptedStudents
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

  const deleteStudent =
    async (
      id: string
    ) => {
      try {
        await axios.delete(
          API_ENDPOINTS.student(id)
        );

        fetchStudents();

        alert(
          "Student Deleted"
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    if (isLoggedIn) {
      fetchStudents();
    }
  }, [isLoggedIn]);

  const handleAuthenticated = () => {
    setIsLoggedIn(true);
    setActiveView("form");
    setSelectedStudent(null);
  };

  const handleEditStudent = (
    student: Student
  ) => {
    setSelectedStudent(student);
    setActiveView("form");
  };

  if (!isLoggedIn) {
    return (
      <>
        <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <section className="grid w-full gap-8 overflow-hidden panel lg:grid-cols-[1.3fr_0.9fr]">
            <div className="space-y-8 px-6 py-8 lg:px-10 lg:py-10">
              <div className="space-y-5">
                <span className="inline-flex items-center rounded-full bg-coral-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-coral-500">
                  Student Vault
                </span>

                <div className="max-w-2xl space-y-4">
                  <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-ink-950 sm:text-5xl lg:text-6xl">
                    Secure student management with a sharper front end.
                  </h1>

                  <p className="max-w-2xl text-base leading-7 text-ink-700 sm:text-lg">
                    Log in first, then move into either student creation or the student roster. The two screens stay separate so the workflow feels cleaner.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[26px] border border-coral-400/15 bg-gradient-to-br from-coral-400/18 via-white to-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-700">
                    Total Students
                  </p>

                  <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-ink-950">
                    {students.length}
                  </p>
                </div>
              </div>
            </div>

            <LoginForm onAuthenticated={handleAuthenticated} />
          </section>
        </main>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="panel overflow-hidden">
          <div className="flex flex-col gap-5 border-b border-sand-200 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-coral-500">
                Authenticated Dashboard
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink-950 sm:text-4xl">
                Choose a single workspace
              </h1>

              <p className="mt-2 text-sm leading-6 text-ink-700">
                Switch between the student intake screen and the roster view. The two are intentionally separated.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className={activeView === "form" ? "primary-button" : "secondary-button"}
                type="button"
                onClick={() => setActiveView("form")}
              >
                Student Form
              </button>

              <button
                className={activeView === "list" ? "primary-button" : "secondary-button"}
                type="button"
                onClick={() => setActiveView("list")}
              >
                Student List
              </button>

              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setIsLoggedIn(false);
                  setActiveView("form");
                  setSelectedStudent(null);
                  setStudents([]);
                }}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 lg:px-10 lg:py-10">
            {activeView === "form" ? (
              <StudentForm
                fetchStudents={fetchStudents}
                selectedStudent={selectedStudent}
                clearSelectedStudent={() =>
                  setSelectedStudent(null)
                }
              />
            ) : (
              <StudentList
                students={students}
                editStudent={handleEditStudent}
                deleteStudent={deleteStudent}
                isLoading={isLoading}
              />
            )}
          </div>
        </section>
      </main>
      <Toaster />
    </>
  );
};

export default App;