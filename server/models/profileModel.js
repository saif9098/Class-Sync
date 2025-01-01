import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {  name:{
    type:String
  },
    college: {
      type: String,
      required: [true, "College name is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    course: {
      type: String,
      required: [true, "course are required"],
     
    },
    startyr: {
      type: String,
      required: [true, "startyr is required"],
     
    },
    endyear: {
      type: String,
      
      
    },
    stream: {
      type: String,
     
    },
   marks: {
      type: String,
      required: [true, "marks is required"],
    },
  
    skillsArr: {
      type: [String], // Array of strings to store the eligibility criteria
      required: [true, "Skills are required"],
    },
  
    resume: {
      type: String,
      required: [true, "Resume is required"],
    },
   
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required:[true]
    },
  },
  { timestamps: true }
);

// Pre-save hook to convert eligibility from a comma-separated string to an array


export default mongoose.model("Profile", profileSchema);
