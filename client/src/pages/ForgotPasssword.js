import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";

import { toast } from "react-toastify";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const { loading } = useSelector((state) => state.alerts);
  const navigate = useNavigate();
const dispatch = useDispatch()
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(showLoading());
      const res = await axios.post("http://localhost:7078/api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword,
      });
      dispatch(hideLoading());
      if (res && res.data.success) {
        toast.success(res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
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
    ) : (
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control exampleInputEmail1"
             
              placeholder="Enter Your favorite Sport Name "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control exampleInputEmail1"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    )}
    </>
  );
};

export default ForgotPasssword;