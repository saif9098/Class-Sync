import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {

const navigate =useNavigate()
// Access name, email, and id properties
const [auth, setAuth] = useAuth();
//state
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [answer, setAnswer] = useState("");
const [photo, setPhoto] = useState("");
useEffect(() => {
  const { email, name, phone, address,answer } = auth?.user;
  setName(name);
  setPhone(phone);
  setEmail(email);
  setAddress(address);
  setAnswer(answer);
}, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      if (!photo) {
        return toast.error("Please Provide Profile Photo");
      }
        // Convert photo to Base64
        const convertToBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
        };
    
        const base64Photo = await convertToBase64(photo);
      const { data } = await axios.put("http://localhost:7078/api/v1/user/update-user", {
      
       name: name,
        email:email,
       password: password,
       phone: phone,
       address: address,
       answer: answer,
        photo: base64Photo,
      });
      console.log(data)
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="">
            <div className="form-container ">
              <form onSubmit={handleSubmit}>
                <h4 className="title">YOUR PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
            
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                  
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                  
                    placeholder="Enter Your Address"
                  />
                </div>
                <div className="mb-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control exampleInputEmail1"
                  placeholder="What is Your Favorite sports"
                  
                />
              </div>
                <div className="mb-3">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                </div>
                <div className="mb-3">
                      {photo && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
    </div>
  )
}

export default UpdateProfile
