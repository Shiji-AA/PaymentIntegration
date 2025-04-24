import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2, 
        maxlength: 50, 
    },
    description: {
        type: String,
        required: true,
        minlength: 3, 
        maxlength: 500,
    },  
     photo:{
        type:String,
        default:"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
    },


},{timestamps:true}
  
)
const Category = mongoose.model("Category", categorySchema);

export default Category;

