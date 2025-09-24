import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
});

export default api;

// Students API
export const getStudents = () => api.get("/students");
export const getStudentById = (id) => api.get(`/students/${id}`);
export const addStudent = (studentData) => api.post("/students", studentData);
export const updateStudent = (id, studentData) => api.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Auth APIs
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);
export const resetPassword = (userData) => api.post("/auth/reset-password", userData);

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get("http://localhost:8080/auth/status", {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return { authenticated: false }; 
  }
};


export const logoutUser = () => api.post("/auth/logout");
