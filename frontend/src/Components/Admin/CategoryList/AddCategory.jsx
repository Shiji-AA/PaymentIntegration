import { useState } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function AddCategory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null); // Store selected file
  const [imagePreview, setImagePreview] = useState(null); // Image preview
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    // Show preview
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "stepglobal"); // Cloudinary Upload Preset
    formData.append("cloud_name", "shijiaa04"); // Cloudinary Cloud Name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/shijiaa04/image/upload",
        formData
      );
      return response.data.url; // Return image URL from Cloudinary
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = null;

    if (photo) {
      imageUrl = await uploadImageToCloudinary(photo);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    axiosInstanceAdmin
      .post("/addcategory", {
        title,
        description,
        photo: imageUrl,
      })
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/getallcategory");
        }
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        } else {
          console.error("Error:", error);
          toast.error("An error occurred");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <AdminNavbar />
      <div className="bg-gradient-to-b from-teal-500 to-white p-4 rounded-lg">
        <br />
        <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          <h2 className="text-2xl font-bold px-6 py-4 bg-teal-800 text-white rounded-t-lg">
            Add Category
          </h2>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter category title"
                className="mt-1 p-2 w-full border border-teal-500 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="mt-1 p-2 w-full border border-teal-500 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              ></textarea>
            </div>

            {/* Image Upload Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 p-2 w-full border border-teal-500 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            {/* Show Image Preview */}
            {imagePreview && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-48 h-32 object-cover border rounded-md"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-500 focus:ring-2 focus:ring-teal-500"
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

export default AddCategory;
