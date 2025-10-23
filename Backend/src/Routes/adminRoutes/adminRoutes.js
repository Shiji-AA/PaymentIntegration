import express from "express";
const adminRouter = express.Router();

import { addCategory, addcourse, adminLogin, deleteCategory, 
    deleteCourse, editCategory, editCourse,
     getAllCategory, getAllCources, getAllStudents, 
    getCategoryById, getCourseById,  } from "../../Controllers/adminController/adminController.js";



adminRouter.post("/adminLogin",adminLogin);

// Course
 adminRouter.post("/addcourse", addcourse);
 adminRouter.get("/getallcourses", getAllCources);
 adminRouter.get("/getallcourse1/:id",getCourseById);
 adminRouter.put("/editcourse/:id", editCourse); //FOR UPDATe
 adminRouter.delete("/deletecourse/:id", deleteCourse);

// Category
adminRouter.post("/addcategory", addCategory);
adminRouter.get("/getallcategory", getAllCategory);
adminRouter.get("/getallcategory1/:id", getCategoryById);
adminRouter.put("/editcategory/:id", editCategory);
adminRouter.delete("/deletecategory/:id", deleteCategory);

//students
adminRouter.get("/getallstudents", getAllStudents);

export default adminRouter;