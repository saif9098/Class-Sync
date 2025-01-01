import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/Layout.css";
import "../../styles/Resumepage.css";
import { userMenu } from "./Menus/UserMenu";
import { useAuth } from '../../context/auth';
const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarMenu = userMenu;
  const [auth,setAuth]=useAuth()
   
  
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("jobinfo")
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div className="layoutbox">
        <div className="sidebar">
        <div className="profileinfo">
        <div className="profilepic">
        <img src={auth?.user.photo} alt="" height={90} width={90} />
        </div>
        <h5 className='fw-bold'>{auth?.user.name} (Admin)</h5>
        <h6>{auth.user.email}</h6>
        </div>
          <div className="menu">
            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && "activated"}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path} >{menu.name}</Link>
                </div>
              );
            })}
          <div className='menu-item'>
           <i class="fa-regular fa-circle-left"></i>
            <Link to="/login" onClick={handleLogout}>Logout</Link>
          </div>
          </div>
        </div>

        <div className="pagebox">{children}</div>
      </div>
    </>
  );
};

export default Layout;
