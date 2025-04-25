import { Link } from "react-router-dom";
import { Eye, Calendar } from "lucide-react"; // Importing icons


import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import toast from "react-hot-toast";

function Software() {
  
  const[courseDetails,setCourseDetails]= useState([])
  const[loading,setLoading]=useState(true)

  useEffect(()=>{
    axiosInstance.get('/getallcoursesuser',{
      params: { department: "Software" },
     
    })
    .then((response)=>{
      if(response.data?.courseDetails){
        const course=response.data.courseDetails
        console.log(course,"courseDetails")
        setCourseDetails(course)
        }  
    })
    .catch((error)=>{
      console.error("Error in fetching Data",error)
      toast.error("Error in Fetching Data")
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return (
    <>

<div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-10 text-gray-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseDetails.map((course) => (
              <div
                key={course._id}
                className="bg-gray-100 rounded-md overflow-hidden shadow-sm transition hover:shadow-md"
              >
                <Link to={`/courseDetailPage/${course._id}`}>
                  <div className="w-full h-48 sm:h-52 lg:h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      src={course.photo}
                      alt="Course Thumbnail"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="bg-gray-200 text-teal-800 font-medium py-1 px-3 rounded-md text-sm">
                      {course.department?.title}
                    </div>
                    <div className="text-gray-800 font-semibold text-sm sm:text-base">
                      Reg Fee : ₹{course.courseFee || "N/A"}
                    </div>
                  </div>

                  <Link to={`/courseDetailPage/${course._id}`}>
                    <h4 className="text-lg font-bold text-teal-800 mt-3 line-clamp-2">
                      {course.courseName}
                    </h4>
                  </Link>

                  {/* Mode & Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4 text-sm">
                    <div className="flex-1 flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm">
                      <Eye className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Mode:</span>
                      <span>{course.mode || "N/A"}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>{course.duration || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
    </>
  );
}

export default Software;