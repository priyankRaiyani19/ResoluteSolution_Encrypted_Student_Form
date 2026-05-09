import type { Student } from "../types/student";

interface Props {
  students: Student[];
  isLoading: boolean;
  editStudent: (
    student: Student
  ) => void;
  deleteStudent: (
    id: string
  ) => void;
}

const StudentList = ({
  students,
  isLoading,
  editStudent,
  deleteStudent,
}: Props) => {
  return (
    <section className="panel px-6 py-6 text-left sm:px-7">
      <div className="flex flex-col gap-4 border-b border-sand-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-mint-400">
            Live Roster
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink-950">
            Student records
          </h2>

          <p className="mt-2 text-sm leading-6 text-ink-700">
            Review enrollment details, jump into edit mode, or remove outdated records.
          </p>
        </div>

        <div className="rounded-full border border-sand-200 bg-sand-50 px-4 py-2 text-sm font-medium text-ink-800">
          {students.length} record{students.length === 1 ? "" : "s"}
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 pt-6 md:grid-cols-2">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              className="animate-pulse rounded-[26px] border border-sand-200 bg-sand-50 p-5"
              key={index}
            >
              <div className="h-5 w-2/3 rounded-full bg-sand-200" />
              <div className="mt-4 h-4 w-full rounded-full bg-sand-100" />
              <div className="mt-3 h-4 w-4/5 rounded-full bg-sand-100" />
              <div className="mt-6 flex gap-3">
                <div className="h-10 w-24 rounded-full bg-sand-200" />
                <div className="h-10 w-24 rounded-full bg-sand-200" />
              </div>
            </div>
          ))}
        </div>
      ) : students.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-[28px] border border-dashed border-sand-200 bg-gradient-to-br from-white to-sand-50 px-6 text-center">
          <p className="rounded-full bg-coral-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-coral-500">
            No records yet
          </p>

          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink-950">
            Your roster is empty.
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-ink-700">
            Add the first student from the registration form to populate this board with encrypted entries.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 pt-6 md:grid-cols-2">
          {students.map(
            (student) => (
              <article
                className="group rounded-[28px] border border-sand-200 bg-gradient-to-br from-white via-white to-sand-50 p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(19,34,56,0.1)]"
                key={student._id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-ink-950">
                      {
                        student.fullName
                      }
                    </h3>
                  </div>

                  <span className="rounded-full bg-mint-300/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mint-400">
                    Active
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm text-ink-800">
                  <p>
                    {student.email}
                  </p>

                  <p>
                    {student.phoneNumber}
                  </p>

                  <p>
                    DOB: {student.dateOfBirth}
                  </p>

                  <p>
                    Course: {student.courseEnrolled}
                  </p>

                  <p className="text-ink-700">
                    {student.address}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    className="secondary-button flex-1"
                    onClick={() =>
                      editStudent(
                        student
                      )
                    }
                    type="button"
                  >
                    Edit
                  </button>

                  <button
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-coral-500 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-coral-400 focus:outline-none focus:ring-4 focus:ring-coral-400/20"
                    onClick={() =>
                      deleteStudent(
                        student._id ||
                          ""
                      )
                    }
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default StudentList;