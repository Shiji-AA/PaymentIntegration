import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";

const CourseList = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstanceAdmin
      .get("/getallcourses")
      .then((response) => {
        if (response.data.courseDetails) {
          setCourseDetails(response.data.courseDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstanceAdmin
          .delete(`/deletecourse/${id}`)
          .then(() => {
            setCourseDetails(courseDetails.filter((course) => course._id !== id));
            toast.success("Course deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting course", error);
            toast.error("Error in deleting course");
          });
      }
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-200 p-4 rounded-lg">
        <div className="px-3 mt-10">
          <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
              <h3 className="text-2xl font-bold mb-4 sm:mb-0 text-teal-900">
                Courses Table
              </h3>
              <Link to="/addcourse">
                <button className="bg-teal-500 text-white px-3 py-1 rounded-lg">
                  Add New Course
                </button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-10 text-gray-600">Loading...</div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="table text-gray-700 border-separate space-y-6 text-sm w-full">
                  <thead className="bg-teal-900 text-white">
                    <tr>
                      <th className="p-3">Sl No</th>
                      <th className="p-3 text-left">Course Code</th>
                      <th className="p-3 text-left">Course Name</th>
                      <th className="p-3 text-left">Department</th>
                      <th className="p-3 text-left">Mode</th>
                      <th className="p-3 text-left">Duration</th>                      
                      <th className="p-3 text-left">Photo</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseDetails.map((course, index) => (
                      <tr key={course._id} className="bg-teal-100 text-black">
                        <td className="p-3 font-medium">{index + 1}</td>
                        <td className="p-3">{course.courseCode}</td>
                        <td className="p-3">{course.courseName}</td>
                        <td className="p-3">{course.department?.title || "N/A"}</td>
                        <td className="p-3">{course.mode}</td>
                        <td className="p-3">{course.duration}</td>
                        
                        <td className="p-3">
                          {course.photo ? (
                            <img
                              src={course.photo}
                              alt="Course"
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          ) : (
                            <span>No image</span>
                          )}
                        </td>
                        <td className="p-6">
                          <Link to={`/editcourse/${course._id}`}>
                            <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-teal-700 focus:outline-none">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!courseDetails.length && (
                      <tr>
                        <td colSpan={8} className="text-center py-4 text-gray-500">
                          No courses found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseList;
