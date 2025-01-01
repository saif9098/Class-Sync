import mongoose from "mongoose";
import profileModel from "../models/profileModel.js";
import adminProfile from "../models/adminProfile.js";
import userModel from "../models/userModel.js";

export const studentProfileController =async(req,res)=>{
    try {
    const {
       name, college, city, course, startyr, endyear, stream, marks, skillsArr, resume
      } =req.body;
      const createdBy = req.user._id;
      const profile = await profileModel.findOne({createdBy:createdBy})
      if(profile){
        const edit =await profileModel.findByIdAndUpdate(profile._id,{
            college:college||profile.college,
            city:city||profile.city,
            course:course||profile.course,
            startyr:startyr||profile.startyr,
           endyear :endyear||profile.endyear,
            stream:stream||profile.stream,
           marks :marks||profile.marks,
           skillsArr :skillsArr||profile.skillsArr,
          resume  :resume||profile.resume,
            
        })
       return res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            edit,
          });
      }
      const newProfile = new profileModel( {
            name,
            college,
            city,
            course,
            startyr,
            endyear,
            stream,
            marks,
            skillsArr,
            resume,
            createdBy
      });
  
      await newProfile.save();
        
        res.status(201).send({
            success: true,
            message: "Profile Updated Successfully",
            newProfile,
          });
       
      } catch (error) {
       res.send(500,"internal server error")
       console.log(error)
      }
}

export const getProfileController =async(req,res)=>{
    try {
        const profile = await profileModel.findOne({createdBy:req.user._id})
        if(profile){
            res.status(201).json(profile)
        }else{
            res.send(200,"noProfile")
        }
    }  catch (error) {
        res.send(500,"internal server error")
        console.log(error)
       }
}
export const getStudentProfilCntrler =async(req,res)=>{
    try {
        const {id}=req.params;
        const profile = await profileModel.findOne({createdBy:id})
        if(profile){
            res.status(201).json(profile)
        }else{
            res.send(200,"noProfile")
        }
    }  catch (error) {
        res.send(500,"internal server error")
        console.log(error)
       }
}

export const editProfileController = async(req,res)=>{
    try {
        const {
            college, city, course, startyr, endyear, stream, marks, about, skillsArr, portfolio, experience, resume,id
          } =req.body;
          console.log("ff")
        const profile = await profileModel.findOne({createdBy:req.user._id})
        if(profile){
            const edit =await profileModel.findByIdAndUpdate(id,{
                college:college||profile.college,
                city:city||profile.city,
                course:course||profile.course,
                startyr:startyr||profile.startyr,
               endyear :endyear||profile.endyear,
                stream:stream||profile.stream,
               marks :marks||profile.marks,
               about :about||profile.about,
               skillsArr :skillsArr||profile.skillsArr,
                portfolio:portfolio||profile.portfolio,
               experience :experience||profile.experience,
              resume  :resume||profile.resume,
                
            })
            res.status(200).send({
                success: true,
                message: "Profile Updated Successfully",
                edit,
              });
        }else{
            res.send(400,"Some error found")
        }
    }  catch (error) {
        res.send(500,"internal server error")
        console.log(error)
       }
}

export const aplicantProfilCntrolr =async (req,res)=>{
  try {
     const {id}=req.params;
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send(200,"noProfile");
    }
    const profile = await profileModel.findOne({_id:id})
    if(profile){
        res.status(201).json(profile)
    }else{
        res.send(200,"noProfile")
    }
}  catch (error) {
    res.send(500,"internal server error")
    console.log(error)
   }
}

export const adminProfileController =async(req,res)=>{
  try {
  const {
     name, college, teachingIn, course, stream, skillsArr
    } =req.body;
    const createdBy = req.user._id;
    const profile = await adminProfile.findOne({createdBy:createdBy})
    if (profile) {
      const edit =await adminProfile.findByIdAndUpdate(profile._id,{
        college:college||profile.college,
        teachingIn:teachingIn||profile.teachingIn,
        qualification:course||profile.qualification,
        stream:stream||profile.stream,
       skillsArr :skillsArr||profile.skillsArr,
        
    })
   return res.status(200).send({
        success: true,
        message: "Profile Updated Successfully",
        edit,
      });
    }
    const user = await userModel.findById(createdBy)
    const newProfile = new adminProfile( {
      name,
      college,
      qualification:course,
      stream,
      teachingIn,
      skillsArr,
      photo:user.photo,
      createdBy,

    });

    await newProfile.save();
      
      res.status(201).send({
          success: true,
          message: "Profile Updated Successfully",
          newProfile,
        });
     
    } catch (error) {
     res.send(500,"internal server error")
     console.log(error)
    }
}
export const getAdminProfileController =async(req,res)=>{
  try {
      const profile = await adminProfile.findOne({createdBy:req.user._id})
      if(profile){
          res.status(201).json(profile)
      }else{
          res.send(200,"noProfile")
      }
  }  catch (error) {
      res.send(500,"internal server error")
      console.log(error)
     }
}
export const getYourTeacherProfilCntrler =async(req,res)=>{
  try {
      const profile = await profileModel.findOne({createdBy:req.user._id})
      if(profile){
      const teachers = await adminProfile.find({teachingIn:{ $regex: profile.college, $options: "i" }})
          res.status(201).json(teachers)
      }else{
          res.send(200,"noProfile")
      }
  }  catch (error) {
      res.send(500,"internal server error")
      console.log(error)
     }
}
