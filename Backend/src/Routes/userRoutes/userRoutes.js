import express from "express";
import {
  getAllCources,
  getAllCources1,
  getCourseById1,
  googleLogin,
  googleRegister,
  loginUser,
  registerUser,
} from "../../Controllers/userController/userController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/google/register',googleRegister);
router.post("/google/login", googleLogin);
router.get("/getallcoursesuser", getAllCources1);
router.get("/getallcoursesuser1", getAllCources);
router.get("/getcoursebyiduser/:id", getCourseById1);


export default router;
