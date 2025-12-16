import { useEffect, useState } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { CSVLink } from "react-csv";

const StudentsList = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    axiosInstanceAdmin
      .get("/getallstudents")
      .then((response) => {
        console.log(response.data,"Response from Admin Dashboard")
        if (response.data.students) {
          setStudentDetails(response.data.students);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data. Please try again later.");
      });
  }, []);

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentDetails.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(studentDetails.length / studentsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // CSV headers
  const csvHeaders = [
    { label: "Sl No", key: "slNo" },
    { label: "Name", key: "customerName" },
    { label: "Email", key: "customerEmail" },
    { label: "Phone", key: "customerPhone" },
    { label: "Whatsapp No", key: "whatsappNumber" },
    { label: "Course Name", key: "courseName" },
    { label: "College", key: "collegeName" },
    { label: "Campus", key: "campusOpted" },
    { label: "Batch", key: "joiningBatch" },
    { label: "DayScholar/Hostler", key: "dayScholarOrHostler" },
    { label: "Laptop", key: "hasLaptop" },
    { label: "Amount", key: "amount" },
    { label: "Registration Date", key: "createdAt" },
  ];

  const csvData = studentDetails.map((student, index) => ({
    slNo: index + 1,
    customerName: student.customerName,
    customerEmail: student.customerEmail,
    customerPhone: student.customerPhone,
    whatsappNumber: student.whatsappNumber,
    courseName: student.course?.courseName,
    collegeName: student.collegeName,
    campusOpted: student.campusOpted,
    joiningBatch: student.joiningBatch,
    dayScholarOrHostler: student.dayScholarOrHostler,
    hasLaptop: student.hasLaptop ? "Yes" : "No",
    amount: student.amount,
    createdAt: new Date(student.createdAt).toLocaleDateString(),
  }));

  return (
    <>
      <AdminNavbar />
      <div className="bg-gradient-to-b from-teal-500 to-white p-4 rounded-lg min-h-screen">
        <div className="px-3 mt-10">
          <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="flex justify-between items-center bg-white p-4 rounded-t-lg">
              <h3 className="text-2xl font-bold text-teal-800">
                Registered Students
              </h3>
              <CSVLink
                data={csvData}
                headers={csvHeaders}
                filename={"students_list.csv"}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                Download
              </CSVLink>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
                <thead className="bg-teal-800 text-white">
                  <tr>
                    <th className="p-3">Sl No</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Whatsapp No</th>
                    <th className="p-3 text-left">Course Name</th>
                    <th className="p-3 text-left">College</th>
                    <th className="p-3 text-left">Campus</th>
                    <th className="p-3 text-left">Batch</th>
                    <th className="p-3 text-left">DayScholar/ <br/>Hostler</th>
                    <th className="p-3 text-left">Laptop</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Payment Status</th>
                    <th className="p-3 text-left">Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student, index) => (
                      <tr
                        key={student._id}
                        className="bg-teal-50 lg:text-black"
                      >
                        <td className="p-3 font-medium capitalize">
                          {indexOfFirstStudent + index + 1}
                        </td>
                        <td className="p-3">{student.customerName}</td>
                        <td className="p-3">{student.customerEmail}</td>
                        <td className="p-3">{student.customerPhone}</td>
                        <td className="p-3">{student.whatsapp}</td>
                        <td className="p-3">{student.course?.courseName}</td>
                        <td className="p-3">{student.collegeName}</td>
                        <td className="p-3">{student.campusOpted}</td>
                        <td className="p-3">{student.joiningBatch}</td>
                        <td className="p-3">{student.dayScholarOrHosteler}</td>
                        <td className="p-3">{student.hasLaptop ? "Yes" : "No"}</td>
                        <td className="p-3">₹{student.amount}</td>
                        <td className="p-3">₹{student.status}</td>
                        <td className="p-3">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={13}
                        className="text-center py-4 text-gray-500"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 my-4">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => paginate(idx + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === idx + 1
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsList;
