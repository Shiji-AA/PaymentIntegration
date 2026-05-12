import { useEffect, useState } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { CSVLink } from "react-csv";

const StudentsList = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    course: "",
    campus: "",
    batch: "",
    dayScholarOrHostler: "",
    hasLaptop: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  useEffect(() => {
    axiosInstanceAdmin
      .get("/getallstudents")
      .then((response) => {
        console.log(response.data, "Response from Admin Dashboard");
        if (response.data.students) {
          setStudentDetails(response.data.students);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data. Please try again later.");
      });
  }, []);

  // Derive unique values for each filter dropdown from the data
  const uniqueCourses = [
    ...new Set(
      studentDetails
        .map((s) => s.course?.courseName)
        .filter(Boolean)
    ),
  ];
  const uniqueCampuses = [
    ...new Set(studentDetails.map((s) => s.campusOpted).filter(Boolean)),
  ];
  const uniqueBatches = [
    ...new Set(studentDetails.map((s) => s.joiningBatch).filter(Boolean)),
  ];
  const uniqueStatuses = [
    ...new Set(studentDetails.map((s) => s.status).filter(Boolean)),
  ];
  const uniqueDayScholarHostler = [
    ...new Set(
      studentDetails.map((s) => s.dayScholarOrHosteler).filter(Boolean)
    ),
  ];

  // Search + Filter logic
  const filteredStudents = studentDetails.filter((student) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      student.customerName?.toLowerCase().includes(q) ||
      student.customerEmail?.toLowerCase().includes(q) ||
      student.customerPhone?.toLowerCase().includes(q) ||
      student.whatsapp?.toLowerCase().includes(q) ||
      student.course?.courseName?.toLowerCase().includes(q) ||
      student.collegeName?.toLowerCase().includes(q) ||
      student.campusOpted?.toLowerCase().includes(q) ||
      student.joiningBatch?.toLowerCase().includes(q) ||
      student.status?.toLowerCase().includes(q);

    const matchesCourse =
      !filters.course || student.course?.courseName === filters.course;
    const matchesCampus =
      !filters.campus || student.campusOpted === filters.campus;
    const matchesBatch =
      !filters.batch || student.joiningBatch === filters.batch;
    const matchesDayScholar =
      !filters.dayScholarOrHostler ||
      student.dayScholarOrHosteler === filters.dayScholarOrHostler;
    const matchesLaptop =
      filters.hasLaptop === "" ||
      (filters.hasLaptop === "yes" ? student.hasLaptop : !student.hasLaptop);
    const matchesStatus =
      !filters.status || student.status === filters.status;

    return (
      matchesSearch &&
      matchesCourse &&
      matchesCampus &&
      matchesBatch &&
      matchesDayScholar &&
      matchesLaptop &&
      matchesStatus
    );
  });

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      course: "",
      campus: "",
      batch: "",
      dayScholarOrHostler: "",
      hasLaptop: "",
      status: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const isAnyFilterActive =
    searchQuery || Object.values(filters).some((v) => v !== "");

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
    { label: "Payment Status", key: "status" },
    { label: "Registration Date", key: "createdAt" },
  ];

  const csvData = studentDetails.map((student, index) => ({
    slNo: index + 1,
    customerName: student.customerName,
    customerEmail: student.customerEmail,
    customerPhone: student.customerPhone,
    whatsappNumber: student.whatsapp,
    courseName: student.course?.courseName,
    collegeName: student.collegeName,
    campusOpted: student.campusOpted,
    joiningBatch: student.joiningBatch,
    dayScholarOrHostler: student.dayScholarOrHosteler,
    hasLaptop: student.hasLaptop ? "Yes" : "No",
    amount: student.amount,
    status: student.status,
    createdAt: new Date(student.createdAt).toLocaleDateString(),
  }));

  return (
    <>
      <AdminNavbar />
      <div className="bg-gradient-to-b from-teal-500 to-white p-4 rounded-lg min-h-screen">
        <div className="px-3 mt-10">
          <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">

            {/* Header */}
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

            {/* Search Bar */}
            <div className="px-4 pb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by name, email, phone, course, college..."
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Filters */}
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">

                <select
                  name="course"
                  value={filters.course}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
                >
                  <option value="">All Courses</option>
                  {uniqueCourses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  name="campus"
                  value={filters.campus}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
                >
                  <option value="">All Campuses</option>
                  {uniqueCampuses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  name="batch"
                  value={filters.batch}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
                >
                  <option value="">All Batches</option>
                  {uniqueBatches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>

                <select
                  name="dayScholarOrHostler"
                  value={filters.dayScholarOrHostler}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
                >
                  <option value="">Day Scholar / Hostler</option>
                  {uniqueDayScholarHostler.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  name="hasLaptop"
                  value={filters.hasLaptop}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
                >
                  <option value="">Laptop (All)</option>
                  <option value="yes">Has Laptop</option>
                  <option value="no">No Laptop</option>
                </select>

                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
                >
                  <option value="">All Statuses</option>
                  {uniqueStatuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Result count + Clear button */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  {filteredStudents.length} of {studentDetails.length} student
                  {studentDetails.length !== 1 ? "s" : ""} shown
                </p>
                {isAnyFilterActive && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-500 hover:text-red-700 underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
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
                    <th className="p-3 text-left">
                      DayScholar/ <br />
                      Hostler
                    </th>
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
                        <td className="p-3">
                          {student.hasLaptop ? "Yes" : "No"}
                        </td>
                        <td className="p-3">₹{student.amount}</td>
                        <td className="p-3">{student.status}</td>
                        <td className="p-3">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={14}
                        className="text-center py-4 text-gray-500"
                      >
                        {isAnyFilterActive
                          ? "No students match the selected filters."
                          : "No students found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 my-6">
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &#171; Page 1
                </button>

                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &#8249; Previous
                </button>

                <span className="px-4 py-2 text-sm text-gray-600 font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next &#8250;
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsList;