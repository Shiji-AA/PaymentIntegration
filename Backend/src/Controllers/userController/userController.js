import User from '../../model/userModel.js'
import generateToken from "../../../Utils/generateToken.mjs"
import jwt from 'jsonwebtoken';
import Course from '../../model/courseModel.js';


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                message: "User registered successfully"
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;   
      console.log(email,password)   
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({error: "User does not exist."});
      }
      if (user.status === 'blocked') {
        return res.status(403).json({ error: "Your account has been blocked." }); 
      }
      if (await user.matchPassword(password)) {
        const userData = {
          name: user.name,
          email: user.email,
          id: user.id,
        };
        const token = generateToken(user.id);
        console.log(token)
        return res.json({
          userData,
          token,
          message: "Login successful",
        });
      } else {
        return res.status(401).json({error: "Incorrect-password."});
      }
    } catch (error) {
      return res
        .status(500)
        .json({error: "An error occurred. Please try again later." });
    }
  };

  const getAllCources1 = async (req, res) => {
      try {
        const departmentName = req.query.department;
        if (!departmentName) {
          return res.status(400).json({ message: "Department name is required" });
        }    
        const courseDetails = await Course.find().populate({
          path: "department",
          match: { title: departmentName },
        });      
           
    const filteredCourses = courseDetails.filter(course => course.department);
              if (filteredCourses.length >0) {      
               res.status(200).json({
                courseDetails:filteredCourses,
                  message:"courseDetails"
                });
              } else {
                return res.status(400).json({
                  message: "no courses in this table",
                });
              }
            } catch (error) {
              return res.status(500).json({ message: "An error occurred. Please try again later." });  
            }
          };


            // to get course details as per id
          const getCourseById1 = async (req, res) => {
            const courseId = req.params.id;
            try {
              const CourseDetails = await Course.findById(courseId).populate('department');
          
              if (CourseDetails) {
                res.status(200).json({
                  CourseDetails, // fixed variable name
                  message: "Course found successfully",
                });
              } else {
                return res.status(404).json({
                  message: "Course not found",
                });
              }
            } catch (error) {
              console.error("Error fetching course:", error);
              return res.status(500).json({
                message: "An error occurred. Please try again later.",
              });
            }
          };
          



  
  export { registerUser ,loginUser,getAllCources1,getCourseById1};
  
