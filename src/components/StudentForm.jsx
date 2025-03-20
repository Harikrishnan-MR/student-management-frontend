import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api"; // ✅ Import default Axios instance

const StudentForm = () => {
  const [student, setStudent] = useState({
    id: "",
    age: "",
    contact_no: "",
    date_of_birth: "",
    department: "",
    father_name: "",
    firstname: "",
    gender: "",
    mother_name: "",
    photo: null,
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    sem6: "",
    sem7: "",
    sem8: "",
    student_class: "",
    surname: "",
    tot_arr: "",
    year_of_join: "",
  });

  const { id } = useParams(); // Get student ID from URL (if editing)
  const navigate = useNavigate();

  // Fetch student data if editing
  useEffect(() => {
    if (id) {
      api.get(`/students/${id}`)
        .then((response) => setStudent(response.data))
        .catch((error) => console.error("Error fetching student:", error));
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/students/${id}`, student);
        alert("Student updated successfully!");
      } else {
        await api.post("/students", student);
        alert("Student added successfully!");
      }
      navigate("/students");
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input type="text" name="id" value={student.id} onChange={handleChange} disabled={!!id} required />
        
        <label>First Name:</label>
        <input type="text" name="firstname" value={student.firstname} onChange={handleChange} required />

        <label>Surname:</label>
        <input type="text" name="surname" value={student.surname} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={student.age} onChange={handleChange} required />

        <label>Date of Birth:</label>
        <input type="date" name="date_of_birth" value={student.date_of_birth} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={student.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Contact No:</label>
        <input type="text" name="contact_no" value={student.contact_no} onChange={handleChange} required />

        <label>Year of Join:</label>
        <input type="number" name="year_of_join" value={student.year_of_join} onChange={handleChange} required />

        <label>Department:</label>
        <input type="text" name="department" value={student.department} onChange={handleChange} required />

        <label>Class:</label>
        <input type="text" name="student_class" value={student.student_class} onChange={handleChange} required />

        <label>Father's Name:</label>
        <input type="text" name="father_name" value={student.father_name} onChange={handleChange} required />

        <label>Mother's Name:</label>
        <input type="text" name="mother_name" value={student.mother_name} onChange={handleChange} required />

        <label>Sem 1:</label>
        <input type="number" name="sem1" value={student.sem1} onChange={handleChange} required />

        <label>Sem 2:</label>
        <input type="number" name="sem2" value={student.sem2} onChange={handleChange} required />

        <label>Sem 3:</label>
        <input type="number" name="sem3" value={student.sem3} onChange={handleChange} required />

        <label>Sem 4:</label>
        <input type="number" name="sem4" value={student.sem4} onChange={handleChange} required />

        <label>Sem 5:</label>
        <input type="number" name="sem5" value={student.sem5} onChange={handleChange} required />

        <label>Sem 6:</label>
        <input type="number" name="sem6" value={student.sem6} onChange={handleChange} required />

        <label>Sem 7:</label>
        <input type="number" name="sem7" value={student.sem7} onChange={handleChange} required />

        <label>Sem 8:</label>
        <input type="number" name="sem8" value={student.sem8} onChange={handleChange} required />

        <label>Total Arrears:</label>
        <input type="number" name="tot_arr" value={student.tot_arr} onChange={handleChange} required />

        <button type="submit">{id ? "Update" : "Add"} Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
