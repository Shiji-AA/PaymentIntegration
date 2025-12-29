import dotenv from 'dotenv';
dotenv.config();
import generateToken from '../../../Utils/generateToken.mjs'
import mongoose from "mongoose";
import User from '../../model/userModel.js';
import bcrypt from 'bcryptjs';
import Course from '../../model/courseModel.js';
import Category from '../../model/categoryModel.js';
import Order from '../../model/orderModel.js';


const adminLogin = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    console.log(adminEmail,"adminEmail")
    const id = new mongoose.Types.ObjectId(process.env.ADMIN_ID);
    const hashedAdminPassword = process.env.ADMIN_PASSWORD; // Hashed password from .env

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the email matches
    if (adminEmail === email) {
      // Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, hashedAdminPassword);

      if (isMatch) {
        const token = generateToken(id);
        return res.status(200).json({
          id,
          adminEmail,
          token,
          message: "Logged in successfully",
        });
      }
    }

    return res.status(401).json({ message: "Invalid Email or Password" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

const addcourse = async (req, res) => {
    try {     
      const {
        courseId,
        department,
        mode,
        duration,
        courseName,    
        courseCode, 
        courseFee, 
        photo,
        description
      } = req.body;
  
  // Check for missing fields
  if (!department || !mode || !duration || !courseName || !courseFee || !courseCode || !photo || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }   
   
      // Create a new certificate
      const newCourse = await Course.create({
        courseId,
        department,
        mode,    
        duration,
        courseFee,
        courseName,
        courseCode,
        photo,
        description
      });
  
      // If the newAdmissionNo was created successfully, send response
      if (newCourse) {
          return res.status(201).json({
          courseId,
          courseName,
          courseCode,
          duration,
          courseFee,
          mode,
          department,
          description,
          photo,
          message: "Course added successfully"
        });
      } else {
        return res.status(400).json({ error: 'Invalid Course data' });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).json({ message: "An error occurred. Please try again later." });
    }
  };
  

const getAllCources = async (req, res) => {
    try {
            const courseDetails = await Course.find().populate('department');
            if (courseDetails) {      
             res.status(200).json({
              courseDetails,
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
const getCourseById = async (req, res) => {
  const courseId = req.params.id;
  try {
    const courseDetails = await Course.findById(courseId).populate('department');

    if (courseDetails) {
      res.status(200).json({
        courseDetails, // fixed variable name
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


  const editCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body; 
  
      console.log("Received Update Data:", updateData);
  
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ error: "Invalid course details" });
      }
  
      // Update only provided fields
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined) {
          course[key] = updateData[key];
        }
      });
  
      const updatedCourse = await course.save();
  
      return res.status(200).json({
        message: "Course updated successfully",
        certificate: updatedCourse,
      });
    } catch (error) {
      console.error("Error updating Course:", error);
      return res.status(500).json({ message: "An error occurred. Please try again later." });
    }
  };
  
  
  
  const deleteCourse = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if course exists
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      // Delete the course
      await Course.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Delete Course Error:", error);
      return res.status(500).json({ message: "An error occurred. Please try again later." });
    }
  };
  
// CATEGORY
  const addCategory= async(req,res)=>{
    try{
        const {title,description,photo} = req.body;         
    const categoryExist= await Category.findOne({
        title: { $regex: new RegExp(title, 'i') },
      });
      if (!title || !description || !photo) {
        return res.status(400).json({ error: "All fields are required" });
    }
      if (categoryExist) {
        console.log('Category already exists');
        return res.status(400).json({ error: 'Category already exists' });
      }        
      const newCategory = await Category.create({
        title,
        description,
        photo
      });
  
      if (newCategory) {
          console.log(title, 'new Title');
          res.status(201).json({
            title,
            description,
            photo,
            message :"Category added successfully"
          });
        } else {
          res.status(400).json({ error: 'Invalid category data' });
        }
          }
    catch(error){
      return res.status(500).json({ message: "An error occurred. Please try again later." });  
    }}

    const getAllCategory = async (req, res) => {
      try {
        const categoryDetails = await Category.find().exec();
        if (categoryDetails) {      
         res.status(200).json({
            categoryDetails,
            message:"categoryDetails"
          });
        } else {
          return res.status(400).json({
            message: "no users in this table",
          });
        }
      } catch (error) {
        return res.status(500).json({ message: "An error occurred. Please try again later." });  
      }
    };

    //to get category details as per id
const getCategoryById =async (req,res)=>{
const categoryId=req.params.id;
try{  
  const categoryDetails = await Category.findById(categoryId).exec();
  if (categoryDetails) {
    res.status(200).json({
      categoryDetails,
      message: "Category found successfully",
    });
  } else {
    return res.status(404).json({
      message: "Category not found",
    });
  }
} catch (error) {
  return res.status(500).json({ message: "An error occurred. Please try again later." });    
}
}


const editCategory =async(req,res)=>{
  try{
    const {id}= req.params;      
    const {title,description} =req.body;
    const category = await Category.findById(id);
    if(!category){
      return res.status(404).json({error:"Invalid category"})
    }

    category.title =title || category.title;
    category.description= description || category.description;
    const updateCategory = await category.save();  
    if(updateCategory){
      return res.status(200).json(
        {message:"Category updated successfully"}
        )
    }else{
      return res.status(404).json({error:"Failed to update category"})
    }
  }
  catch(error){
    return res.status(500).json({ message: "An error occurred. Please try again later." });  
    }
}
const deleteCategory = async(req,res)=>{
  try{
    const {id}=req.params;
    const category = await Category.findById(id);
    if(!category){
      return res.status(400).json({error:"Category not found"})
    }
 await Category.findByIdAndDelete(id)
 res.status(200).json({message:"category deleted successfully"})
    }  
  catch(error){    
    return res.status(500).json({ message: "An error occurred. Please try again later." });  
  }  
}
const getAllStudents = async (req, res) => {
  try {
      const studentDetails = await Order.find()
      .populate("course", "courseName department") // populate course name and department
      .populate("user", "firstName lastName email phone"); // optional: populate user details

    if (studentDetails && studentDetails.length > 0) {
      return res.status(200).json({
        students: studentDetails,
        message: "Student registration details fetched successfully",
      });
    } else {
      return res.status(404).json({
        message: "No students have registered yet.",
        students: [],
      });
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({
      message: "An error occurred. Please try again later.",
      error: error.message,
    });
  }
};

 export {
  adminLogin,
  addcourse,
  getAllCources,
  getCourseById,
  editCourse,
  deleteCourse,
  addCategory,
  getAllCategory,
  getCategoryById,
  editCategory,
  deleteCategory,
  getAllStudents
};

