import { useState, useEffect } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useFormik } from "formik";

function AddCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstanceAdmin.get("/getallcategory");
        console.log(response,"category Details")
        setCategories(response.data.categoryDetails || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!values.courseName) errors.courseName = "Course Name is required";
    if (!values.courseCode) errors.courseCode = "Course Code is required";
    if (!values.department) errors.department = "Department is required";
    if (!values.mode) errors.mode = "Please select a mode";
    if (!values.duration) errors.duration = "Duration is required";
    if (!values.courseFee) errors.courseFee = "Course Fee is required";
    if (!values.description) errors.description = "Description is required";

    if (values.photo && values.photo instanceof File) {
      const allowedFileTypes = ["png", "jpg", "jpeg"];
      const fileExtension = values.photo.name.split(".").pop().toLowerCase();
      const maxSize = 1 * 1024 * 1024;

      if (!allowedFileTypes.includes(fileExtension)) {
        errors.photo = `Only ${allowedFileTypes.join(", ")} files allowed`;
      }

      if (values.photo.size > maxSize) {
        errors.photo = "Max file size is 1MB";
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      courseName: "",
      courseCode: "",
      courseFee: "",
      department: "",
      mode: "",
      duration: "",
      description: "",
      isEnrolled: false,
      photo: null,
      imagePreview: null,
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        let imgUrl = null;

        if (values.photo && values.photo instanceof File) {
          const formData = new FormData();
          formData.append("file", values.photo);
          formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
          formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
            formData
          );

          if (response.data && response.data.url) {
            imgUrl = response.data.url;
          }
        }

        const addResponse = await axiosInstanceAdmin.post(`/addcourse`, {
          courseName: values.courseName,
          courseCode: values.courseCode,
          courseFee: values.courseFee,
          department: values.department, // category _id
          mode: values.mode,
          duration: values.duration,
          description: values.description,
          isEnrolled: values.isEnrolled,
          photo: imgUrl || values.photo,
        });

        if (addResponse.data) {
          toast.success("Course added successfully!");
          navigate("/getallcourses");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to add course. Try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("photo", file);
      const previewUrl = URL.createObjectURL(file);
      formik.setFieldValue("imagePreview", previewUrl);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="bg-gradient-to-b from-teal-300 to-white p-4 rounded-lg">
        <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          <h2 className="text-2xl font-bold px-6 py-4 bg-tealDark text-teal-800 rounded-t-lg">
            Add Course
          </h2>
          <form onSubmit={formik.handleSubmit} className="p-6">

            {/* Course Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Course Name</label>
              <input
                type="text"
                name="courseName"
                value={formik.values.courseName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-tealLight rounded-md"
                placeholder="e.g. Certified Construction Site Engineer"
              />
              {formik.touched.courseName && formik.errors.courseName && (
                <div className="text-red-500 text-sm">{formik.errors.courseName}</div>
              )}
            </div>

             {/* Course Code */}
             <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Course Code</label>
              <input
                type="text"
                name="courseCode"
                value={formik.values.courseCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-tealLight rounded-md"
                placeholder="e.g. Certified Construction Site Engineer"
              />
              {formik.touched.courseCode && formik.errors.courseCode && (
                <div className="text-red-500 text-sm">{formik.errors.courseCode}</div>
              )}
            </div>

            {/* Department */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-tealLight rounded-md bg-gray-100"
              >
                <option value="">Select a department</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              {formik.touched.department && formik.errors.department && (
                <div className="text-red-500 text-sm">{formik.errors.department}</div>
              )}
            </div>

            {/* Mode */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mode</label>
              <select
                name="mode"
                value={formik.values.mode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-tealLight rounded-md"
              >
                <option value="" disabled>Select mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {formik.touched.mode && formik.errors.mode && (
                <div className="text-red-500 text-sm">{formik.errors.mode}</div>
              )}
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <select
                name="duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-tealLight rounded-md"
              >
                <option value="" disabled>Select Duration</option>
                <option value="1 month">1 Month</option>
                <option value="2 months">2 Months</option>
                <option value="3 months">3 Months</option>
                <option value="4 months">4 Months</option>
                <option value="6 months">6 Months</option>
                <option value="1 year">1 Year</option>
              </select>
              {formik.touched.duration && formik.errors.duration && (
                <div className="text-red-500 text-sm">{formik.errors.duration}</div>
              )}
            </div>


  {/* Course Fee */}
<div className="mb-4 shadow-md p-2 rounded-lg">
  <label className="block text-sm font-medium text-gray-900">Course Fee</label>
  <input
    type="text"
    name="courseFee"
    value={formik.values.courseFee}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="mt-1 p-2 w-full border border-tealLight rounded-md shadow-sm"
    placeholder="e.g. 1500"
  />
  {formik.touched.courseFee && formik.errors.courseFee && (
    <div className="text-red-500 text-sm">{formik.errors.courseFee}</div>
  )}
</div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">Description</label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 w-full border border-tealLight rounded-md"
                rows="4"
                placeholder="Enter a short description about the course"
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm">{formik.errors.description}</div>
              )}
            </div>

            {/* Upload Course Photo */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">Upload Course Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 p-2 w-full border border-tealLight rounded-md"
              />
              {formik.touched.photo && formik.errors.photo && (
                <div className="text-red-500 text-sm">{formik.errors.photo}</div>
              )}
            </div>

            {/* Image Preview */}
            {formik.values.imagePreview && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Preview:</p>
                <img
                  src={formik.values.imagePreview}
                  alt="Preview"
                  className="mt-2 w-48 h-32 object-cover border rounded-md"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-teal-500 text-white w-full py-2 rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-tealLight"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCourse;
