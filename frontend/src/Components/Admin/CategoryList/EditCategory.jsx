import { useState,useEffect } from 'react';
import { axiosInstanceAdmin } from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

function EditCategory() {
  const{id}=useParams();
  const navigate = useNavigate();
  const [title,setTitle] =useState("");
  const [description,setDescription] = useState("");

  useEffect(() => {
     axiosInstanceAdmin.get(`/getallcategory1/${id}`)     
     .then((response)=>{
      if(response.data){ 
      setTitle(response.data.categoryDetails.title)  
      setDescription(response.data.categoryDetails.description)         
      }
     })
      .catch(error => {
        console.error("Error fetching category details:", error);
      });
  }, [id]);


  const handleEditSubmit =(e)=>{
  e.preventDefault();
  axiosInstanceAdmin.put(`/editcategory/${id}`,{title,description})
  .then((response)=>{
    if(response){      
      navigate('/getallcategory')
    }else{
      console.error("Request failed with status code:")
    }
  })
  .catch((error)=>{
    console.error("Error occurred:", error);
  })
  
}

  return (
  <>
    <AdminNavbar />
    <div className="bg-gradient-to-b from-teal-500 to-white p-4 rounded-lg">
    <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-md">
  
      <h2 className="text-2xl font-bold px-6 py-4 bg-teal-800 text-white rounded-t-lg">Edit Category</h2>
      <form onSubmit={handleEditSubmit} className="p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Category Title</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter category title"
            className="mt-1 p-2 w-full border border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            id="description"
            name="description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description" 
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-800 focus:outline-none"></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">Save Changes</button>
        </div>
      </form>
    </div>
</div>   
  </>
   
  
  );
}

export default EditCategory;