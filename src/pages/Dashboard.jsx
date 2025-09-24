import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Footer.css";  


const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
    <div className="dashboard-container">

      <h2>Welcome, {user ? user.username : "Guest"}!</h2>
    
      <div className="dashboard-buttons">
        <button className="view-students" onClick={() => navigate("/students")}>View Students</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>

    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
