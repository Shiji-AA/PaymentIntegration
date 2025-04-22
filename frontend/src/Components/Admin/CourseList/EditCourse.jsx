import { useState, useEffect } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstanceAdmin.get("/getallcategory");
        setCategories(response.data.categoryDetails || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.courseName) {
      errors.courseName = "Course name is required";
    }
    if (!values.courseCode) {
      errors.courseCode = "Course code is required";
    }
    if (!values.courseFee) {
      errors.courseFee = "Course Fee is required";
    }

    if (!values.mode) {
      errors.mode = "Mode is required";
    }

    if (!values.duration) {
      errors.duration = "Duration is required";
    }

    if (values.photo && values.photo instanceof File) {
      const allowedTypes = ["jpg", "jpeg", "png"];
      const ext = values.photo.name.split(".").pop().toLowerCase();
      const maxSize = 1 * 1024 * 1024;

      if (!allowedTypes.includes(ext)) {
        errors.photo = "Only jpg, jpeg, png files are allowed";
      }

      if (values.photo.size > maxSize) {
        errors.photo = "File size exceeds 1 MB";
      }
    }

    return errors;
  };

  useEffect(() => {
    axiosInstanceAdmin
      .get(`/getallcourse1/${id}`)
      .then((response) => {
        const course = response.data.courseDetails;
        console.log(course,"course")

        setCourseData({
          department: course.department?._id || "",
          mode: course.mode || "",
          courseName: course.courseName || "",
          courseCode: course.courseCode || "",
          courseFee: course.courseFee || "",
          duration: course.duration || "",
          photo: course.photo || null,
          description: course.description || "",
        });
      })
      .catch((err) => {
        console.error("Failed to load course:", err);
        toast.error("Error loading course details.");
      });
  }, [id]);

  const formik = useFormik({
    initialValues: courseData || {
      department: "",
      mode: "",
      courseName: "",
      courseCode: "",
      courseFee: "",
      duration: "",
      photo: null,
      description: "",
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        let photoUrl = values.photo;

        if (values.photo instanceof File) {
          const formData = new FormData();
          formData.append("file", values.photo);
          formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
          formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

          const uploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
            formData
          );

          if (uploadRes.data && uploadRes.data.url) {
            photoUrl = uploadRes.data.url;
          }
        }

        const updatedFields = {};
        Object.keys(values).forEach((key) => {
          if (
            values[key] !== formik.initialValues[key] &&
            values[key] !== ""
          ) {
            updatedFields[key] = values[key];
          }
        });

        if (photoUrl !== formik.initialValues.photo) {
          updatedFields.photo = photoUrl;
        }

        if (Object.keys(updatedFields).length === 0) {
          toast.error("No changes made");
          setLoading(false);
          return;
        }

        const res = await axiosInstanceAdmin.put(
          `/editcourse/${id}`,
          updatedFields
        );

        if (res.data) {
          toast.success("Course updated successfully!");
          navigate("/getallcourses");
        }
      } catch (err) {
        console.error("Update error:", err);
        toast.error(
          err.response?.data?.error || "Failed to update course. Try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  // Cleanup URL object from image preview
  useEffect(() => {
    return () => {
      if (formik.values.photo instanceof File) {
        URL.revokeObjectURL(formik.values.photo);
      }
    };
  }, [formik.values.photo]);

  return (
    <>
      <AdminNavbar />
      <div className="bg-gradient-to-b from-teal-300 to-white p-6 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-800 mb-6">
            Edit Course Details
          </h2>

          {!courseData ? (
            <div className="text-center text-gray-500">Loading course details...</div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              {/* Course Name */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formik.values.courseName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border p-2 rounded bg-gray-100"
                />
                {formik.touched.courseName && formik.errors.courseName && (
                  <p className="text-sm text-red-500">
                    {formik.errors.courseName}
                  </p>
                )}
              </div>

                {/* Course Code */}
                <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Course Code
                </label>
                <input
                  type="text"
                  name="courseCode"
                  value={formik.values.courseCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border p-2 rounded bg-gray-100"
                />
                {formik.touched.courseCode && formik.errors.courseCode && (
                  <p className="text-sm text-red-500">
                    {formik.errors.courseCode}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border p-2 rounded bg-gray-100"
                >
                  <option value="" disabled>Select Department</option>
                  {categories.length === 0 ? (
                    <option disabled>No departments found</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Mode */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Mode
                </label>
                <select
                  name="mode"
                  value={formik.values.mode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border p-2 rounded bg-gray-100"
                >
                  <option value="" disabled>
                    Select Mode
                  </option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
                {formik.touched.mode && formik.errors.mode && (
                  <p className="text-sm text-red-500">{formik.errors.mode}</p>
                )}
              </div>

              {/* Duration */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  name="duration"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border p-2 rounded bg-gray-100"
                >
                  <option value="" disabled>
                    Select Duration
                  </option>
                  <option value="1 month">1 Month</option>
                  <option value="2 months">2 Months</option>
                  <option value="3 months">3 Months</option>
                  <option value="6 months">6 Months</option>
                  <option value="1 year">1 Year</option>
                </select>
                {formik.touched.duration && formik.errors.duration && (
                  <p className="text-sm text-red-500">{formik.errors.duration}</p>
                )}
              </div>


               {/* Course Fee */}
<div className="mb-4 shadow-md p-1 rounded-lg bg-white">
  <label className="block font-medium text-gray-900 mb-1">
    Course Fee
  </label>
  <input
    type="text"
    name="courseFee"
    value={formik.values.courseFee}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full border p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
    placeholder="e.g. 1500"
  />
  {formik.touched.courseFee && formik.errors.courseFee && (
    <p className="text-sm text-red-500 mt-1">
      {formik.errors.courseFee}
    </p>
  )}
</div>


              {/* Description */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>

              {/* Photo */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      formik.setFieldValue("photo", file);
                      toast.success("Image selected.");
                    }
                  }}
                  className="block w-full p-2 border rounded"
                />
                {formik.errors.photo && (
                  <p className="text-sm text-red-500">{formik.errors.photo}</p>
                )}
                {formik.values.photo && (
                  <div className="mt-2">
                    {formik.values.photo instanceof File && (
                      <p className="text-sm text-gray-600">{formik.values.photo.name}</p>
                    )}
                    <img
                      src={
                        formik.values.photo instanceof File
                          ? URL.createObjectURL(formik.values.photo)
                          : formik.values.photo
                      }
                      alt="Preview"
                      className="mt-1 h-32 w-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 w-full"
              >
                {loading ? "Updating..." : "Update Course"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default EditCourse;
