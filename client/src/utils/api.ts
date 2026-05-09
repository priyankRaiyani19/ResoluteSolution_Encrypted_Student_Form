const API_BASE_URL =
  "http://localhost:5000/api";

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  signup: `${API_BASE_URL}/signup`,
  register: `${API_BASE_URL}/register`,
  students: `${API_BASE_URL}/students`,
  student: (id: string) =>
    `${API_BASE_URL}/student/${id}`,

  // Aliases for clear intent by HTTP verb usage.
  updateStudent: (id: string) =>
    `${API_BASE_URL}/student/${id}`,
  deleteStudent: (id: string) =>
    `${API_BASE_URL}/student/${id}`,

  courses: `${API_BASE_URL}/courses`,
};
