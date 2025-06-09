import React, { useState, useEffect } from 'react';

function CourseEnrollment() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    course: '',
    selectedCampus: '',
    paymentReference: '',
  });

  // Mock course data (replace with API call later)
  useEffect(() => {
    const mockCourses = [
      {
        _id: '1',
        name: 'Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, and React in 12 weeks.',
        fee: 25000,
      },
      {
        _id: '2',
        name: 'Data Science Essentials',
        description: 'Introduction to Python, Pandas, and machine learning.',
        fee: 30000,
      },
      {
        _id: '3',
        name: 'UI/UX Design Masterclass',
        description: 'Master design thinking, Figma, and user testing.',
        fee: 20000,
      },
    ];

    setCourses(mockCourses);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'course') {
      const course = courses.find((c) => c._id === value);
      setSelectedCourse(course);
    }
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with:', formData);
    alert('Proceeding to checkout...');
    // Redirect to payment here if needed
  };

  if (!courses.length) {
    return <div className="text-center mt-10 text-gray-500">Loading courses...</div>;
  }

  return (
    <div className=" mt-20  mb-20 bg-yellow-500 max-w-2xl mx-auto p-6 bg-white shadow-md rounded space-y-6">
      <h2 className="text-2xl font-bold text-center">Course Enrollment</h2>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Email"
          required
        />
      </div>



      {/* Course Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">-- Choose a course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Course Details */}
      {selectedCourse && (
        <div className="p-4 border rounded bg-gray-100">
          <h3 className="font-semibold text-lg">{selectedCourse.name}</h3>
          <p className="text-sm mt-1">{selectedCourse.description}</p>
          <p className="mt-2 font-medium text-blue-700">Fee: ₹{selectedCourse.fee}</p>
        </div>
      )}

      {/* Campus Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Campus</label>
        <select
          name="selectedCampus"
          value={formData.selectedCampus}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select campus --</option>
          <option value="Kottiyam">Kottiyam</option>
          <option value="Kollam">Kollam</option>
          <option value="Kochi">Kochi</option>
        </select>
      </div>

      {/* Optional Payment Reference */}
      <input
        type="text"
        name="paymentReference"
        value={formData.paymentReference}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        placeholder="Payment Reference (optional)"
      />

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CourseEnrollment;
