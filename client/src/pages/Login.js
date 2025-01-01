import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [apiData, setApiData] = useState("");
  const [auth, setAuth] = useAuth();
  const [loginBox ,setLoginBox] = useState(true)

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  // redux state
  const { loading } = useSelector((state) => state.alerts);

  const sendOtp = async ()=>{
    try {
      if(!email){
        toast.error("please provide email");
      }
        dispatch(showLoading());
      const { data } = await axios.post("http://localhost:7078/api/v1/auth/otp-login", {
        email
      });
      dispatch(hideLoading())
      if(data.success){
      toast.success(data.message);
      setLoginBox(false)
      setApiData(data)
      }else {
        dispatch(hideLoading());
        toast.error(data.message);
      }

      
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message);
    }
  }
const varifyOtp = (e)=>{
  e.preventDefault();
  if(otp==apiData.otp){
    toast.success("Login successfully");
    localStorage.setItem("auth", JSON.stringify(apiData));
    setAuth({
      ...auth,
      user: apiData.user,
      token: apiData.token,
    });
    navigate(location.state || "/")
  }else{
    toast.error("Invalid otp")
  }
 
}
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("http://localhost:7078/api/v1/auth/login", {
        email,
        password,
      });
     if (data.success) {
        dispatch(hideLoading());
        toast.success(data.message);
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        navigate(location.state || "/");
      } else {
        dispatch(hideLoading());
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message);

    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (<>{loginBox? (
        <div className="form-container" >
        <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN FORM</h4>

        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control exampleInputEmail1"
            placeholder="Enter Your Email "
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={sendOtp}
          >
            Get Otp
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
        </div>
      ):(
         <div className="form-container">
        <form onSubmit={varifyOtp}>
        <h4 className="title">LOGIN THROUGH OTP</h4>

        <div className="mb-3">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="form-control"
            placeholder="Enter 4 digit Otp "
            required
          />
        </div>
       
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setLoginBox(true)
            }}
          >
            Go Back
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
        </div>)}
       
        </>
      )}
    </>
  );
};

export default Login;
