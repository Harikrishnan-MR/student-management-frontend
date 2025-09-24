import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentForm from "./pages/StudentForm";
import StudentDetail from "./pages/StudentDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/global.css";  
import "./styles/Navbar.css";
import "./styles/Login.css";
import "./styles/Register.css";
import "./styles/Dashboard.css";
import "./styles/Students.css";
import "./styles/StudentForm.css";  
import "./styles/StudentDetails.css";
import "./styles/Footer.css";  


function App() {

  return (
    <AuthProvider>
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/students/view/:id" element={<ProtectedRoute><StudentDetail /></ProtectedRoute>} />
          <Route path="/students/add" element={<ProtectedRoute><StudentForm /></ProtectedRoute>} />
          <Route path="/students/edit/:id" element={<StudentForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
