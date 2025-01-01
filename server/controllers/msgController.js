import msgModel from "../models/msgModel.js";
import profileModel from "../models/profileModel.js";

export const addTeacherController =async(req,res)=>{
  try{ const {teacherId,name,studentName}=req.body;
   const msg = await msgModel.findOne({
    student:req.user._id,
    teacher:teacherId
   })
   if(msg){
    return  res.status(201).send({
        success: true,
        message: "Teacher is already added"
      });
   }
 const profile=  await profileModel.findOne({createdBy:req.user._id});
   await msgModel.create({
       teacherName:name,
       studentName:studentName,
       studentBatch:profile.endyear,
    student:req.user._id,
    teacher:teacherId
   })
   res.status(201).send({
    success: true,
    message: "Teacher added successfully"
  });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export const getConnectedTeacherCntrlr = async(req,res)=>{
    try {
        const data =await msgModel.find({student:req.user._id})
        res.status(201).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
}
export const getConnectedStudentCntrlr = async(req,res)=>{
    try { const {batch}=req.body;
    let data;
    if(!batch){
         data =await msgModel.find({teacher:req.user._id}) 
        }else{
            data =await msgModel.find({teacher:req.user._id,studentBatch:batch}) 
            
        }

        res.status(201).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
}
export const deleteTeacherController = async(req,res,next)=>{
    try {
        const {id}=req.params;
     const data=   await msgModel.findOne({_id:id});
     console.log(id)
     if(!data){
        next("Unable to delete")
        return ;
     }
     await data.deleteOne()
     res.status(201).send({
        success:true,
        message:"Connection deleted successfully"
     })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        
    }
}
export const sendFeedConstroller = async (req,res)=>{
    try {
        const {id}=req.params;
   const {feed}=req.body;
 const data=await msgModel.findByIdAndUpdate(id, {feedback:feed})
 if(data){
    res.status(201).send({
        success:true,
        message:"Feedback/issue sent successfully"
    })
 }
    
 } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    
}
}
export const editMsgConstroller = async (req,res)=>{
    try {
        const {id}=req.params;
   const {message,attendance,resource}=req.body;
 const data=await msgModel.findByIdAndUpdate(id, {message:message,attendance:attendance,resource:resource})
 if(data){
    res.status(201).send({
        success:true,
        message:"Message sent successfully"
    })
 }
    
 } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    
}
}
export const getStudentsConstroller = async (req,res)=>{
    try {
     
 const data=await msgModel.find({teacher:req.user._id})
 if(data){
    res.status(201).json(data);
 }
    
 } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    
}
}

