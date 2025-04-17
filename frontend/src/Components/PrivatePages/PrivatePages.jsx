import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivatePages() {
  const user = useSelector((state) => state.auth.userdata);
  
    if (user) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
   }

export default PrivatePages;
