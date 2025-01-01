import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {  name:{
    type:String
  },
    college: {
      type: String,
      required: [true, "College name is required"],
    },
    qualification: {
      type: String,
      required: [true, "course are required"],
     
    },
    skillsArr: {
      type: [String], // Array of strings to store the eligibility criteria
      required: [true, "Skills are required"],
    },
    teachingIn:{
      type: String,
      required: [true, "College/School name is required"],
    },
    stream: {
      type: String,
     
    },
    photo:{
      type: String,
      
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


export default mongoose.model("AdminProfile", profileSchema);
