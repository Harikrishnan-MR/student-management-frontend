import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Footer.css";
const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await getStudents();
    setStudents(response.data);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents(); // Refresh the list after deletion
  };

  return (
    <>
    <div className="students-container">
      <h2>Student List</h2>
      <button className="add-student-btn" onClick={() => navigate("/students/add")}>➕ Add Student</button>
      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstname} {student.surname}</td>
                <td>{student.department}</td>
                <td className="student-actions">
                  <button className="view" onClick={() => navigate(`/students/view/${student.id}`)}>👁️ View</button>
                  <button className="edit" onClick={() => navigate(`/students/edit/${student.id}`)}>✏ Edit</button>
                  <button className="delete" onClick={() => handleDelete(student.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
    </>
  );
}
export default Students;
