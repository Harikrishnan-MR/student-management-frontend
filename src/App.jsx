import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Users from "./pages/Users";
import StudentForm from "./components/StudentForm";
import StudentDetail from "./pages/StudentDetails";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Import Global Styles
import "./styles/global.css";  
import "./styles/Navbar.css";
import "./styles/Login.css";
import "./styles/Register.css";
import "./styles/Dashboard.css";
import "./styles/Students.css";
import "./styles/Users.css";
import "./styles/StudentForm.css";  
import "./styles/StudentDetails.css";  

console.log("✅ App Component Loaded..."); // Debug message

function App() {
  console.log("✅ Rendering App..."); // Debug message

  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* ✅ Include Navbar */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/students/view/:id" element={<ProtectedRoute><StudentDetail /></ProtectedRoute>} />
          <Route path="/students/add" element={<ProtectedRoute><StudentForm /></ProtectedRoute>} />
          <Route path="/students/edit/:id" element={<StudentForm />} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
