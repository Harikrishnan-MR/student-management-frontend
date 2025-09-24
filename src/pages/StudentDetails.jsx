import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Footer from "../components/Footer";
import "../styles/Footer.css";  



const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await getStudentById(id);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  // ✅ Generate PDF & Allow User to Choose File Name
  const handleDownloadPDF = async () => {
    const fileName = prompt("Enter file name for the PDF:", `Student_${id}.pdf`);
    if (!fileName) return; // If user cancels, stop execution

    const input = pdfRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

    pdf.save(fileName); // ✅ User-defined file name
  };

  return (
    <>
    <div className="student-detail-container">
      <h2>Student Details</h2>
      {student ? (
        <div ref={pdfRef} className="student-info">
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.firstname} {student.surname}</p>
          <p><strong>Age:</strong> {student.age}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Year of Join:</strong> {student.year_of_join}</p>
          <p><strong>Contact No:</strong> {student.contact_no}</p>
          <p><strong>Father's Name:</strong> {student.father_name}</p>
          <p><strong>Mother's Name:</strong> {student.mother_name}</p>
          <p><strong>Semesters Marks:</strong></p>
          <ul>
            <li>Sem 1: {student.sem1}</li>
            <li>Sem 2: {student.sem2}</li>
            <li>Sem 3: {student.sem3}</li>
            <li>Sem 4: {student.sem4}</li>
            <li>Sem 5: {student.sem5}</li>
            <li>Sem 6: {student.sem6}</li>
            <li>Sem 7: {student.sem7}</li>
            <li>Sem 8: {student.sem8}</li>
          </ul>
          <p><strong>Total Arrears:</strong> {student.tot_arr}</p>
          <p><strong>Class:</strong> {student.student_class}</p>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}

      {/* 📌 Buttons */}
      <div className="student-actions">
        <button onClick={handleDownloadPDF}>📄 Download PDF</button>
        <button onClick={() => window.print()}>🖨 Print</button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default StudentDetail;
