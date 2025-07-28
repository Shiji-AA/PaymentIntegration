import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance, axiosInstancePayment } from "../../../api/axiosInstance";
import home from "../../../assets/icons/home.png";
import clock from "../../../assets/icons/clock.png";
import box from "../../../assets/icons/box.png";
import arrow from "../../../assets/icons/arrow.png";
import cat4 from "../../../assets/hero.jpg";
import { useSelector } from 'react-redux';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCampus, setSelectedCampus] = useState("Kochi");

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);

  useEffect(() => {
    axiosInstance
      .get(`/getcoursebyiduser/${id}`)
      .then((response) => {
        setCourse(response.data?.CourseDetails);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleEnrollNow = async () => {
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
      campus: selectedCampus,
      firstName: userData?.firstName || "John",
      lastName: userData?.lastName || "Doe",
      customerEmail: userData?.email || "test@email.com",
      customerPhone: userData?.phone || "9999999999",
      description: `Registration for ${course?.courseName}`,
    };

    try {
      const paymentResponse = await axiosInstancePayment.post('/initiate', payload);

      if (paymentResponse.data.status === 'NEW' && paymentResponse.data.payment_links?.web) {
        window.location.href = paymentResponse.data.payment_links.web;
      } else {
        alert('Could not initiate payment.');
      }
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Something went wrong during enrollment.');
    }
  };

  const handleEnrollClick = () => {
    if (userData) {
      handleEnrollNow();
    } else {
      navigate('/login');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!course) return <div className="text-center py-10">Course not found</div>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[320px] md:h-[420px] w-full flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cat4})`, filter: "brightness(50%)" }} />
        <div className="absolute inset-0 bg-gray-800 opacity-30" />
        <div className="relative text-center">
          <h1 className="text-4xl md:text-6xl font-bold">{course?.courseName}</h1>
          <nav className="mt-2 text-lg">
            <a href="https://technical.arcite.in/" className="text-white hover:underline">Home</a>
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

            {/* Right Column - Info Card */}
            <div className="bg-white shadow-xl p-6 space-y-4 h-fit mt-10 lg:mt-0 rounded-md">
              {/* Mode */}
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-gray-100 transition">
                <img src={home} alt="Mode" className="w-6 h-6 object-contain" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-2 w-full">
                  <div className="text-gray-800 font-semibold">Mode:</div>
                  <div className="text-sm text-gray-500">{course?.mode}</div>
                </div>
              </div>

              {/* Code */}
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-gray-100 transition">
                <img src={clock} alt="Code" className="w-6 h-6 object-contain" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-2 w-full">
                  <div className="text-gray-800 font-semibold">Code:</div>
                  <div className="text-sm text-gray-500">{course?.courseCode}</div>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-gray-100 transition">
                <img src={box} alt="Duration" className="w-6 h-6 object-contain" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-2 w-full">
                  <div className="text-gray-800 font-semibold">Duration:</div>
                  <div className="text-sm text-gray-500">{course?.duration}</div>
                </div>
              </div>

              {/* Fee */}
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-gray-100 transition">
                <div className="text-gray-800 font-bold">
                  Reg Fee : ₹{course?.courseFee || "Not available"}
                </div>
              </div>

              {/* Campus Selection */}
              <div className="mt-4">
                <label htmlFor="campus" className="block text-sm font-medium text-gray-900 mb-1 p-1">
                  Select Campus:
                </label>
                <select
                  id="campus"
                  name="campus"
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Kottiyam">Kottiyam</option>
                  <option value="Kadappakkada">Kadappakkada</option>
                  <option value="Kochi">Kochi</option>
                </select>
              </div>

              {/* Enroll Button */}
              <button
                onClick={handleEnrollClick}
                className="w-full mt-8 flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white text-lg font-medium hover:bg-black hover:text-white border border-teal-600 transition rounded-md"
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
