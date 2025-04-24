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

      <div data-aos="fade-up" 
       className="bg-white py-24 px-6 flex justify-center">
        <div className="max-w-6xl w-full">
          {loading?(
   <div className="text-center py-10 text-gray-600">Loading...</div>
          ):(
            <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courseDetails.map((course) => (
                <div
                  key={course._id}
                  className="bg-gray-100 overflow-hidden p-6 "
                >
                  <Link to={`/courseDetailPage/${course._id}`}>
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        src={course.photo}
                        alt="Course Thumbnail"
                      />
                    </div>
                  </Link>
                 
                  <div className=" font-body text-start mt-4">
                  <div className="flex items-center gap-x-16">
                      <div className="bg-gray-200 text-teal-800 font-medium py-1 px-4 inline-block rounded-md hover:bg-teal-600 hover:text-white transition-colors duration-200">
                        {course.department?.title}
                      </div>
                      <div className="text-gray-800 font-semibold text-md">
                        ₹{course.courseFee || "N/A"}
                      </div>
                    </div>
                    <Link to={`/courseDetailPage/${course._id}`}>
                    <h4 className="text-lg font-bold text-teal-800 mt-2">
                      {course.courseName}
                    </h4>
  
                    </Link>

                 
                    {/* Mode and Duration Section */}
  
                    <div className="font-body flex justify-start gap-2 mt-4">
  {/* Mode */}
  <p className="border border-gray-300 rounded-3xl px-6 py-2 text-sm bg-gray-100 shadow-sm flex items-center gap-2">
    <Eye className="w-4 h-4 text-gray-600" />
    <span className="font-medium">Mode:</span>
    <span>{course.mode || "Not available"}</span>
  </p>

  {/* Duration */}
  <p className="border border-gray-300 rounded-3xl px-6 py-2 text-sm bg-gray-100 shadow-sm flex items-center gap-2">
    <Calendar className="w-4 h-4 text-gray-600" />
    <span className="font-medium">{course.duration || "Not available"}</span>
  </p>
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