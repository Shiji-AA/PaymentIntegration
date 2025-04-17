import axios from "axios"

const axiosInstance = axios.create({  
   baseURL: `${import.meta.env.VITE_PUBLIC_API_URL}/api/users`
});
const axiosInstanceAdmin = axios.create({
   baseURL:`${import.meta.env.VITE_PUBLIC_API_URL}/api/admin`
})

// *********************************************************************************
// Request interceptor User
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log(token,"interceptor page token")
//     if (token !== null) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

 // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (
//       error.response &&
//       error.response.data.status === 401 &&
//       error.response.data.error === "Unauthorized - No token found"
//     ) {
//       console.log("Unauthorized access - no token found");
//     }
//     return Promise.reject(error);
//   }
// );

// *********************************************************************************
// Request interceptor Admin
axiosInstanceAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    console.log(token,"interceptor page Admin token")
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

 // Response interceptor
axiosInstanceAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response &&
      error.response.data.status === 401 &&
      error.response.data.error === "Unauthorized - No token found"
    ) {
      console.log("Unauthorized access - no token found");
    }
    return Promise.reject(error);
  }
);


export { axiosInstance,axiosInstanceAdmin};