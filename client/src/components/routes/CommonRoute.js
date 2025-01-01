import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";

const CommonRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth]= useAuth();
 
        useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(
        "http://localhost:7078/api/v1/user/auth-check"
      );
      console.log(data.ok)
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return( ok ? children:
    <>
    <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
    <h1 className="">Sorry! Please Login!</h1>
    </div>
    </>
  );;
  }

export default CommonRoute;
