import mongoose  from "mongoose";

const msgModel = mongoose.Schema({
    attendance:{
        type:Number,
        default:0
    },
    teacherName:{
   type:String,
   required:true
    },
    studentName:{
   type:String,
   required:true
    },
    studentBatch:{
   type:String,
   required:true
    },
    message:{
        type:String,
        default:"N/A"
    },
    resource:{
         type:String,
    },
    feedback:{
         type:String,
        default:"N/A"
    },
    student:{
         type: mongoose.Types.ObjectId,
             ref: "User",
             required:[true]
    },
    teacher:{
         type: mongoose.Types.ObjectId,
             ref: "User",
             required:[true]
    }
})

export default mongoose.model("Notifications", msgModel);