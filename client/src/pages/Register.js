import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("")

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName ||!title || !email || !password || !phone || !address || !answer) {
        return toast.error("Please Provide All Necessary Fields");
      }

      dispatch(showLoading());
     let base64Photo ="";
      // Convert photo to Base64
      if(photo){
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };
  
     base64Photo = await convertToBase64(photo);
    }
      const userData = {
        name,
        lastName,
        title,
        email,
        password,
        phone,
        address,
        answer,
        photo: base64Photo, // Base64 string
      };
      
      const { data } = await axios.post("http://localhost:7078/api/v1/auth/register", userData);
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register Successfully");
        
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
         
          <div className="mb-3">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control exampleInputEmail1"
              
              placeholder="Enter Your Surname"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
          <select
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="form-control exampleInputEmail1"
          placeholder="Enter Your Surname"
          required
          autoFocus
        >
          <option value="" disabled>
            -- Choose your title --
          </option>
          <option value="Student">Student</option>
          <option value="Prof.">Professor</option>
          <option value="Dr.">Doctor</option>
          <option value="Mr.">Mr.</option>
          <option value="Miss.">Miss.</option>
        </select>
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control exampleInputEmail1"
              placeholder="Enter Your College Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control exampleInputEmail1"
              placeholder="What is Your Favorite sports"
              required
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
                      alt="profile_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
        </div>
      )}
    </>
  );
};

export default Register;
