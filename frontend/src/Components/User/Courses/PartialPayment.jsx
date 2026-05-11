import { useEffect, useState } from "react";
import { axiosInstance, axiosInstancePaymentPartial } from "../../../api/axiosInstance";
import { useSelector } from "react-redux";
import arrow from "../../../assets/icons/arrow.png";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FIXED_AMOUNT = 2500;

function PartialPayment() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");

  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    campusOpted: "",
  });

  const userData = useSelector((state) => state.auth.userdata);

  useEffect(() => {
    axiosInstance
      .get("/getallSoftwareCourses")
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

  const handlePhoneChange = (value) => {
    setPaymentDetails((prev) => ({ ...prev, phone: value }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!paymentDetails.name || paymentDetails.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (!paymentDetails.email || paymentDetails.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(paymentDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    const phone = paymentDetails.phone.replace(/\D/g, "");
    if (!paymentDetails.phone || phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!selectedCourse) {
      newErrors.course = "Please select a course";
    }

    if (!paymentDetails.campusOpted) {
      newErrors.campusOpted = "Please select a campus";
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
      campusOpted: paymentDetails.campusOpted,
      amount: FIXED_AMOUNT,
    };

    try {
      const paymentResponse = await axiosInstancePaymentPartial.post("/initiate-partial", payload);
      if (
        paymentResponse.data.status === "NEW" &&
        paymentResponse.data.payment_links?.web
      ) {
        window.location.href = paymentResponse.data.payment_links.web;
      } else {
        toast.error("Could not initiate payment.");
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error("Something went wrong during enrollment.");
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading courses...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg flex flex-col lg:flex-row max-w-5xl w-full overflow-hidden">

        {/* LEFT SIDE INFO */}
        <div className="lg:w-2/5 bg-teal-700 text-white py-14 px-10 flex flex-col justify-between">
          <div>
            <h1 className="text-sm font-semibold mb-3 uppercase tracking-widest opacity-80">
              ARCITE EDUCATIONAL SOLUTIONS PVT. LTD.
            </h1>

            <h2 className="text-3xl font-bold mb-4 leading-snug">
              Partial Payment
              <br />
              <span className="text-teal-200">2026–27</span>
            </h2>

            <p className="text-sm leading-relaxed opacity-90 mt-2">
              Reserve your seat at{" "}
              <span className="font-semibold text-white">
                ARCITE School of Technical Education
              </span>{" "}
              by making a partial payment of ₹2,500.
            </p>

            {/* Amount Summary Box */}
            <div className="mt-8 bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm">
              <div className="flex justify-between font-bold text-base text-white">
                <span>Amount Payable</span>
                <span>₹{FIXED_AMOUNT.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="mt-8 space-y-1">
              <h3 className="text-sm font-semibold mb-2 opacity-80 uppercase tracking-wide">
                Contact Us
              </h3>
              <p className="text-sm">📧 info@arcite.in</p>
              <p className="text-sm">📞 7994211144</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="lg:w-3/5 p-8 bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 mb-1 text-center">
            Course Enrollment
          </h2>
          <p className="text-center text-sm text-gray-400 mb-7">
            Fill in your details to reserve your spot
          </p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={paymentDetails.name}
              onChange={handlePaymentChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={paymentDetails.email}
              onChange={handlePaymentChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              country={"in"}
              value={paymentDetails.phone}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "100%",
                height: "42px",
                fontSize: "15px",
                paddingLeft: "48px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
              containerStyle={{ width: "100%" }}
              buttonStyle={{
                borderRadius: "6px 0 0 6px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb",
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Course Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Course Opted <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setErrors((prev) => ({ ...prev, course: "" }));
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="">-- Select Course --</option>
              {courseDetails.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.courseName}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">{errors.course}</p>
            )}
          </div>

          {/* Campus Opted */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Campus Opted <span className="text-red-500">*</span>
            </label>
            <select
              name="campusOpted"
              value={paymentDetails.campusOpted}
              onChange={handlePaymentChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="">-- Select Campus --</option>
              {["Kottiyam", "Kadappakkada", "Kochi", "Online"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.campusOpted && (
              <p className="text-red-500 text-sm mt-1">{errors.campusOpted}</p>
            )}
          </div>

          {/* Pay Button */}
          <button
            onClick={handleEnrollNow}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white text-lg font-semibold hover:bg-teal-800 active:scale-95 transition-all rounded-md shadow-md"
          >
            Pay ₹{FIXED_AMOUNT.toLocaleString("en-IN", { minimumFractionDigits: 2 })} & Enroll
            <img src={arrow} alt="arrow" className="w-5 h-5" />
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            🔒 Secure payment powered by Cashfree
          </p>
        </div>
      </div>
    </div>
  );
}

export default PartialPayment;
