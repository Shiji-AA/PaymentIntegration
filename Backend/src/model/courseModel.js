import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    }, 
    courseName: {
      type: String,
      required: true,
      trim: true,
      lowercase: false,
    },  
    courseCode: {
      type: String,
      required: true,
      trim: true,
      lowercase: false,
    },  
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',  
      required: true,
    },
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Hybrid'],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
    },
    description: {
      type: String,
      required: true,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
