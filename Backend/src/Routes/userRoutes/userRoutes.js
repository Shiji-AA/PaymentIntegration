import express from "express";
import {
  getAllCources1,
  getCourseById1,
  loginUser,
  registerUser,
} from "../../Controllers/userController/userController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getallcoursesuser", getAllCources1);
router.get("/getcoursebyiduser/:id", getCourseById1);


export default router;
