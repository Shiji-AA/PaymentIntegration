import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance, axiosInstancePayment } from "../../../api/axiosInstance";
import arrow from "../../../assets/icons/arrow.png";
import cat4 from "../../../assets/hero.jpg";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

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

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);

  useEffect(() => {
    axiosInstance
      .get(`/getcoursebyiduser/${id}`)
      .then((response) => {
        setCourse(response.data?.CourseDetails);

        // Prefill user data if available
        if (userData) {
          setPaymentDetails((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, userData]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value, field) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
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
    requiredFields.forEach((field) => {
      if (!paymentDetails[field] || paymentDetails[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (paymentDetails.email && !/\S+@\S+\.\S+/.test(paymentDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation (at least 10 digits after country code)
    const phone = paymentDetails.phone.replace(/\D/g, '');
    if (phone && phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    const whatsapp = paymentDetails.whatsapp.replace(/\D/g, '');
    if (whatsapp && whatsapp.length < 10) {
      newErrors.whatsapp = "WhatsApp number must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEnrollNow = async () => {
    if (!validateFields()) {
      return;
    }

    if (!userData || !course) {
      alert("User or Course data is missing.");
      return;
    }

    const payload = {
      orderId: `order_${Date.now()}`,
      customerId: userData?._id || userData?.id,
      userId: userData?._id || userData?.id,
      courseId: course?._id,
      coursename: course?.courseName,
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
        alert("Could not initiate payment.");
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Something went wrong during enrollment.");
    }
  };

  const handleEnrollClick = () => {
    if (userData) {
      handleEnrollNow();
    } else {
      navigate("/login");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!course) return <div className="text-center py-10">Course not found</div>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[320px] md:h-[420px] w-full flex flex-col items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cat4})`, filter: "brightness(50%)" }}
        />
        <div className="absolute inset-0 bg-gray-800 opacity-30" />
        <div className="relative text-center">
          <h1 className="text-4xl md:text-6xl font-bold">{course?.courseName}</h1>
          <nav className="mt-2 text-lg">
            <a href="https://technical.arcite.in/" className="text-white hover:underline">
              Home
            </a>
            <span className="mx-2"> &gt; </span>
            <span className="text-gray-300">{course.department?.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-3">
              <div className="bg-teal-800 text-white font-medium py-1 px-4 inline-block">
                {course.department?.title}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6">
                {course.courseName}
              </h1>
              <div className="px-4 md:px-8">
                <img
                  src={course.photo}
                  alt={course.courseName}
                  className="w-full h-auto object-cover my-6 rounded-md"
                />
                <div className="mt-6 text-justify text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                  {course.description}
                </div>
              </div>
            </div>

            {/* Right Column - Info Card + Payment Form */}
            <div className="bg-white border-t border-gray-200 shadow-xl p-6 space-y-4 h-fit mt-10 lg:mt-0 rounded-md">
              <div className="pt-4 space-y-3">
                <h2 className="text-xl font-semibold mb-2">Payment Details</h2>

                {/* Amount Field */}
                <div>
                  <label className="block text-gray-700 font-medium">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    value={`₹${paymentDetails.amount.toFixed(2)}`}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={paymentDetails.name}
                    onChange={handlePaymentChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name}</span>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={paymentDetails.email}
                    onChange={handlePaymentChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
                </div>

                {/* WhatsApp Number with Country Code */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">WhatsApp Number</label>
                  <PhoneInput
                    country={'in'}
                    value={paymentDetails.whatsapp}
                    onChange={(value) => handlePhoneChange(value, 'whatsapp')}
                    inputStyle={{
                      width: '100%',
                      height: '42px',
                      fontSize: '16px',
                      paddingLeft: '48px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db'
                    }}
                    containerStyle={{
                      width: '100%'
                    }}
                    buttonStyle={{
                      borderRadius: '6px 0 0 6px',
                      border: '1px solid #d1d5db',
                      backgroundColor: '#f9fafb'
                    }}
                  />
                  {errors.whatsapp && (
                    <span className="text-red-500 text-sm">{errors.whatsapp}</span>
                  )}
                </div>

                {/* Phone Number with Country Code */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone</label>
                  <PhoneInput
                    country={'in'}
                    value={paymentDetails.phone}
                    onChange={(value) => handlePhoneChange(value, 'phone')}
                    inputStyle={{
                      width: '100%',
                      height: '42px',
                      fontSize: '16px',
                      paddingLeft: '48px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db'
                    }}
                    containerStyle={{
                      width: '100%'
                    }}
                    buttonStyle={{
                      borderRadius: '6px 0 0 6px',
                      border: '1px solid #d1d5db',
                      backgroundColor: '#f9fafb'
                    }}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">{errors.phone}</span>
                  )}
                </div>

                {/* College Name Field */}
                <div>
                  <label className="block text-gray-700 font-medium">College Name</label>
                  <input
                    type="text"
                    name="collegeName"
                    value={paymentDetails.collegeName}
                    onChange={handlePaymentChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {errors.collegeName && (
                    <span className="text-red-500 text-sm">{errors.collegeName}</span>
                  )}
                </div>

                {/* Dropdown fields */}
                {[
                  { label: "Campus Opted", name: "campusOpted", options: ["Kottiyam", "Kadappakkada", "Kochi", "Online"] },
                  { label: "Joining Batch", name: "joiningBatch", options: ["August", "September", "October"] },
                  { label: "DayScholar or Hosteler", name: "dayScholarOrHosteler", options: ["DayScholar", "Hosteler"] },
                  { label: "Do you have a Laptop", name: "hasLaptop", options: ["Yes", "No"] },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-700 font-medium">{field.label}</label>
                    <select
                      name={field.name}
                      value={paymentDetails[field.name]}
                      onChange={handlePaymentChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">--Select--</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm">{errors[field.name]}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Enroll Button */}
              <button
                onClick={handleEnrollClick}
                className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white text-lg font-medium hover:bg-black hover:text-white border border-teal-600 transition rounded-md"
              >
                Enroll Now
                <img src={arrow} alt="Arrow" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDetails;