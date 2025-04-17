import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const PrivatePageAdmin = () => {
    const admin =  useSelector((state)=>state.admin.admindata);

    if(admin){
        return <Outlet />;
    }else {
    return <Navigate to = {'/admin'}/>
   }
}

export default PrivatePageAdmin ;
