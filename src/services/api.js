import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ;


// ✅ Create an Axios instance with credentials enabled
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Enables sending session cookies with requests
});

// ✅ Export as default
export default api;

// ✅ Student Management APIs
export const getStudents = () => api.get("/students");
export const getStudentById = (id) => api.get(`/students/${id}`);
export const addStudent = (studentData) => api.post("/students", studentData);
export const updateStudent = (id, studentData) => api.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// ✅ Authentication APIs (Session-based)
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);
export const resetPassword = (userData) => api.post("/auth/reset-password", userData);

// ✅ Check authentication status (Session validation)
export const checkAuthStatus = () => api.get("/auth/status");

// ✅ Logout (Session-based)
export const logoutUser = () => api.post("/auth/logout");

// ✅ User Management APIs
export const getUsers = () => api.get("/users");  // ✅ Get all users
export const getUserById = (id) => api.get(`/users/${id}`); // ✅ Get user by ID
export const addUser = (userData) => api.post("/users", userData); // ✅ Add a new user
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData); // ✅ Update user details
export const deleteUser = (username) => api.delete(`/users/${username}`); // ✅ Delete user
