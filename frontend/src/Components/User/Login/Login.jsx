import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../api/axiosInstance/";
import toast from "react-hot-toast";
import { setUserInfo } from "../../../../Redux/Slices/AuthSlice";
import logoArcite from "../../../assets/logoArcite.png";
import admin1 from '../../../assets/admin1.jpg'
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google';
import { useFormik } from 'formik';


function Login() {
  const client_id=import.meta.env.VITE_CLIENT_ID || "";
  const user = useSelector((state) => state.auth.userdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate=values=>{
    const errors={};
    if (!values.email) {
      errors.email = 'Required';
    } 
    if (!values.password) {
      errors.password = 'Required';
    } 
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate, 
    onSubmit: (values) => {
      axiosInstance
        .post('/login', values)
        .then((response) => {
          if (response.data.message) {  
            console.log(response.data.message,"response fro login")              
            localStorage.setItem("token", response.data.token);   
            dispatch(setUserInfo(response.data.userData));    
            toast.success(response.data.message);          
            navigate("/");
          }
        })
        .catch((error) => {
         if (error.response && error.response.data.error){        
            switch (error.response.data.error) {
              case 'Your account has been blocked.':
                toast.error("Your account has been blocked.");
                break;
                case 'User does not exist.':
                toast.error("User does not exist.");
                break;
                case 'Incorrect password.':
                toast.error("Incorrect password.");
                break;
              default:
                toast.error("An unexpected error occurred.");
            }
          }else{
            toast.error(error.message);
          }
        });     
    }
  });
  
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section>   
<GoogleOAuthProvider clientId={client_id} >
<div className="flex min-h-screen justify-center items-center bg-teal-50"style={{ backgroundImage: `url(${admin1})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
      <div className="bg-white rounded-lg border border-gray-300 shadow-md overflow-hidden sm:max-w-sm sm:w-full">
        <div className="px-6 py-8">
          <img
            className="mx-auto h-8 w-30"
            src={logoArcite}
            alt="Arcite logo"
          />
          <h2 className="mt-6 text-center text-xl font-bold leading-9 text-tealDark">
            Login to your account
          </h2>

          <form onSubmit ={formik.handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Enter your username"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
                 {formik.touched.email && formik.errors.email ? <div className="text-red-600 text-sm mt-1 font-medium">{formik.errors.email}</div> : null}
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-tealLight focus:border-teal-500 sm:text-sm"
                />
                 {formik.touched.password && formik.errors.password ? <div className="text-red-600 text-sm mt-1 font-medium">{formik.errors.password}</div> : null}
              </div>
              <a href="/forgotpassword" className=" flex justify-end text-xs pt-2 font-semibold text-tealDark hover:text-tealLight">
               Forgot password?
              </a>
            </div> 
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-black bg-teal-500 hover:bg-tealLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tealLight"
              >
               LOGIN
              </button>


            </div>
          </form>
          <br/>
          <p className="text-center text-sm font-semibold text-gray-900 dark:text-gray-400">
                Dont have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-customColor hover:underline dark:text-customColor text-teal-900"
                >
                  Register Here
                </Link>
              </p>

                  {/* Google Authentication */}
                  <div id="signInButton">
                <GoogleLogin
                  type='standard'
                  theme='filled_black'
                  size='large'
                  onSuccess={response => {
                    axiosInstance.post('/google/login', response)
                      .then((res) => {
                        console.log(res, 'google @')
                        if (res.data.message) {
                          localStorage.setItem("token", res.data.token);                        
                          dispatch(setUserInfo(res.data.userData));
                          toast.success(res.data.message);
                          navigate('/');
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.error);
                      });
                  }}
                />
              </div>

        </div>
      </div>
    </div>
</GoogleOAuthProvider>
   
    </section>
  );
}

export default Login;