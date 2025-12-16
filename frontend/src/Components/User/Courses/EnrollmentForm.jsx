import { useEffect, useState } from "react";
import { axiosInstance, axiosInstancePayment } from "../../../api/axiosInstance";
import { useSelector } from "react-redux";
import arrow from "../../../assets/icons/arrow.png";
import toast from "react-hot-toast";

function EnrollmentForm() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");

  const [paymentDetails, setPaymentDetails] = useState({
    amount: 1000,
    name: "",
    email: "",
    whatsapp: "",
    phone: "",
    collegeName: "",
    campusOpted: "",
    joiningBatch: "",
    dayScholarOrHosteler: "",
    hasLaptop: "",
  });

  const userData = useSelector((state) => state.auth.userdata);

  useEffect(() => {
    axiosInstance
      .get("/getallcoursesuser1")
      .then((response) => {
        if (response.data?.courseDetails) {
          setCourseDetails(response.data.courseDetails);
        } else {
          toast.error("No courses found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching course data");
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const requiredFields = [
      "name",
      "email",
      "whatsapp",
      "phone",
      "collegeName",
      "campusOpted",
      "joiningBatch",
      "dayScholarOrHosteler",
      "hasLaptop",
    ];

    const newErrors = {};

    // Step 1: Required fields check
    requiredFields.forEach((field) => {
      if (!paymentDetails[field] || paymentDetails[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    // Step 2: Email and phone validation
    if (paymentDetails.email && !/\S+@\S+\.\S+/.test(paymentDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    const phone = paymentDetails.phone.trim();
    if (phone && !/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Step 3: Course selection check
    if (!selectedCourse) {
      newErrors["course"] = "Please select a course";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEnrollNow = async () => {
    if (!validateFields()) return;

    const chosenCourse = courseDetails.find((c) => c._id === selectedCourse);

    const payload = {
      orderId: `order_${Date.now()}`,
      customerId: userData?._id || userData?.id || null,
      userId: userData?._id || userData?.id || null,
      courseId: chosenCourse?._id,
      coursename: chosenCourse?.courseName,
      customerName: paymentDetails.name,
      customerEmail: paymentDetails.email,
      customerPhone: paymentDetails.phone,
      collegeName: paymentDetails.collegeName,
      campusOpted: paymentDetails.campusOpted,
      joiningBatch: paymentDetails.joiningBatch,
      dayScholarOrHosteler: paymentDetails.dayScholarOrHosteler,
      hasLaptop: paymentDetails.hasLaptop,
      whatsapp: paymentDetails.whatsapp,
      amount: paymentDetails.amount,
    };

    try {
      const paymentResponse = await axiosInstancePayment.post("/initiate", payload);
      if (paymentResponse.data.status === "NEW" && paymentResponse.data.payment_links?.web) {
        window.location.href = paymentResponse.data.payment_links.web;
      } else {
        toast.error("Could not initiate payment.");
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error("Something went wrong during enrollment.");
    }
  };

  const handleEnrollClick = () => handleEnrollNow();

  if (loading) return <div className="text-center py-10">Loading courses...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg flex flex-col lg:flex-row max-w-6xl w-full">
        {/* LEFT SIDE INFO */}
        <div className="lg:w-2/5 bg-gray-100 text-gray-700 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none py-14 px-10 flex flex-col justify-between">
          <div>
            <h1 className="text-md font-semibold mb-4 text-gray-700">
              ARCITE EDUCATIONAL SOLUTIONS PRIVATE LIMITED
            </h1>

            <h1 className="text-2xl font-bold mb-6">
              Your First Offer Letter at ARCITE <br /> 25–26
            </h1>

            <p className="text-sm leading-relaxed text-gray-600">
              Payment link for training program registrations at
              <br />
              <span className="font-semibold">
                ARCITE SCHOOL OF TECHNICAL EDUCATION
              </span>.
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Contact Us:</h3>
              <p className="text-sm">📧 info@arcite.in</p>
              <p className="text-sm">📞 7994211144</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="lg:w-3/5 p-8 bg-white rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none">
          <h2 className="text-2xl font-semibold text-gray-600 mb-6 text-center">
            Course Enrollment Form
          </h2>

    
       {/* Amount */}
<div className="mb-6">
  <label className="block text-gray-700 font-medium mb-1">Amount</label>
  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
    <span className="text-lg font-semibold text-gray-700 mr-1">₹</span>
    <span className="text-lg font-bold text-gray-800">
      {paymentDetails.amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  </div>
</div>


          {/* Name, Email, Whatsapp */}
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Whatsapp Number", name: "whatsapp", type: "text" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "College Name", name: "collegeName", type: "text" },
          ].map((f) => (
            <div key={f.name} className="mb-4">
              <label className="block text-gray-700 font-medium">{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                value={paymentDetails[f.name]}
                onChange={handlePaymentChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors[f.name] && <p className="text-red-500 text-sm">{errors[f.name]}</p>}
            </div>
          ))}

          {/* Course Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Course Opted</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">--Select--</option>
              {courseDetails.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.courseName}
                </option>
              ))}
            </select>
            {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
          </div>

          {/* Remaining Dropdown Fields */}
          {[
            {
              label: "Campus Opted",
              name: "campusOpted",
              options: ["Kottiyam", "Kadappakkada", "Kochi", "Online"],
            },
            {
              label: "Joining Batch",
              name: "joiningBatch",
              options: ["August", "September", "October"],
            },
            {
              label: "DayScholar or Hosteler",
              name: "dayScholarOrHosteler",
              options: ["DayScholar", "Hosteler"],
            },
            {
              label: "Do you have a Laptop",
              name: "hasLaptop",
              options: ["Yes", "No"],
            },
          ].map((f) => (
            <div key={f.name} className="mb-4">
              <label className="block text-gray-700 font-medium">{f.label}</label>
              <select
                name={f.name}
                value={paymentDetails[f.name]}
                onChange={handlePaymentChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">--Select--</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors[f.name] && <p className="text-red-500 text-sm">{errors[f.name]}</p>}
            </div>
          ))}

          {/* Submit Button */}
          <button
            onClick={handleEnrollClick}
            className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white text-lg font-medium hover:bg-black transition rounded-md"
          >
            Enroll Now
            <img src={arrow} alt="arrow" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentForm;
