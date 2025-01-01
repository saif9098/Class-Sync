import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
  try {
    const { name, email, password, address,answer, phone,photo } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const newPassword = password ? password : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: newPassword || user.password,
        phone: phone || user.phone,
        answer: answer || user.answer,
        photo: photo || user.photo,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
    console.log(updatedUser,photo)
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};