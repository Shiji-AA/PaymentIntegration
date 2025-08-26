import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/User/Register/Register";
import CivilEngineering from "./Pages/user/CivilEngineering";
import ElectricalEngineering from "./Pages/user/ElectricalEngineering";
import MechanicalEngineering from "./Pages/user/MechanicalEngineering";
import Login from "./Components/User/Login/Login";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
import AdminDashboardPage from "./Pages/admin/AdminDashboardPage";
import CourseList from "./Components/Admin/CourseList/CourseList";
import AddCourse from "./Components/Admin/CourseList/AddCourse";
import EditCourse from "./Components/Admin/CourseList/EditCourse";
import CategoryList from "./Components/Admin/CategoryList/CategoryList";
import AddCategory from "./Components/Admin/CategoryList/AddCategory";
import EditCategory from "./Components/Admin/CategoryList/EditCategory";
import CourseDetailPage from "./Pages/user/CourseDetailPage";
//import PrivatePages from "./Components/PrivatePages/PrivatePages";
import PrivatePageAdmin from "./Components/PrivatePages/PrivatePageAdmin";
import { Toaster } from "react-hot-toast";
import RefundPolicy from "./Components/User/Policy/RefundPolicy";
import PrivacyPolicy from "./Components/User/Policy/PrivacyPolicy";
import TermsnConditions from "./Components/User/Policy/TermsnConditions";
import SoftwarePage from "./Pages/user/SoftwarePage";
import EnrollmentPage from "./Pages/user/EnrollmentPage";
import PaymentSuccess from "./Components/User/Courses/PaymentSuccess";
import ReceiptPage from "./Components/User/Enrollment/ReceiptPage";
import PaymentFailure from "./Components/User/Courses/PaymentFailure";


function App() {
  return (
    <Router>
   
      <Toaster position="top-right"/>
      <Routes>
        {/* ADMIN SIDE */}
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route element={<PrivatePageAdmin />}>
        <Route path="/admindashboard" element={<AdminDashboardPage />} />
        <Route path="/getallcourses" element={<CourseList />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/editcourse/:id" element={<EditCourse/>} />
        <Route path="/getallcategory" element={< CategoryList/>} />      
        <Route path="/addcategory" element={<AddCategory/>} />
        <Route path="/editcategory/:id" element={<EditCategory/>} />
        </Route>
   

        {/* USER SIDE */}
        <Route path="/" element={<CivilEngineering />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/refundPolicy" element={<RefundPolicy />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsnConditions />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failure" element={<PaymentFailure />} />

        {/* <Route element={<PrivatePages />}> */}
        <Route path="/electrical" element={<ElectricalEngineering />} />
        <Route path="/mechanical" element={<MechanicalEngineering />} />      
        <Route path="/software" element={<SoftwarePage/>} />
        <Route path="/courseDetailPage/:id" element={<CourseDetailPage/>} />
        <Route path="/enroll" element={<EnrollmentPage/>} />
        <Route path="/receipt/:orderId" element={<ReceiptPage/>} />
        
      

        {/* </Route>  */}

       </Routes>
    </Router>
  );
}

export default App;
