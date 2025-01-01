import userModel from "../models/userModel.js";
import fs from "fs";
import JWT from "jsonwebtoken";
import { sendMail } from "./helpers/MailHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, lastName,title, email, password, phone, address, answer,photo} = req.body;
    
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!title) {
      return res.send({ message: "Title is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    if(photo && photo.size > 1000000){
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 1mb" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    let role =0;
   if(title !="student"){
    role =1;
   }
    const newUser = new userModel({
      name,
      lastName,
      title,
      email,
      password,
      phone,
      address,
      answer,
      role,
      photo, // Storing Base64 string directly
    });

    await newUser.save();
    sendMail(email,"Welcome in Class-Sync Website", `Hi ${name} Thank you for registering! We wish Our Application will be helpful for you `)
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};
//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
     
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
   
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        lastName:user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        answer:user.answer,
        photo:user.photo
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    console.log(email,answer,newPassword)
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    await userModel.findByIdAndUpdate(user._id, {password:newPassword});
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const otpLoginController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    if (!email) {
     
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const otp = Math.floor(1000+Math.random()*9000);
    sendMail(email,"One Time Password from Career Jump", `Dear customer! Your one time password to login is ${otp} (do not share it with strangers)`)
 
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
   
    res.status(200).send({
      success: true,
      message: "otp has been sent ",
      otp:otp,
      user: {
        _id: user._id,
        name: user.name,
        lastName:user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        answer:user.answer,
        photo:user.photo
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};