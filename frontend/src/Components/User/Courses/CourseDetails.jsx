import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance, axiosInstancePayment } from "../../../api/axiosInstance";
import arrow from "../../../assets/icons/arrow.png";
import cat4 from "../../../assets/hero.jpg";
import { useSelector } from "react-redux";

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
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
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

                {/** Render input fields dynamically */}
                {[
                  { label: "Amount", name: "amount", type: "text", readOnly: true },
                  { label: "Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Whatsapp Number", name: "whatsapp", type: "text" },
                  { label: "Phone", name: "phone", type: "text" },
                  { label: "College Name", name: "collegeName", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-700 font-medium">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={
                        field.readOnly
                          ? `₹${paymentDetails.amount.toFixed(2)}`
                          : paymentDetails[field.name]
                      }
                      onChange={handlePaymentChange}
                      readOnly={field.readOnly}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm">{errors[field.name]}</span>
                    )}
                  </div>
                ))}

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
