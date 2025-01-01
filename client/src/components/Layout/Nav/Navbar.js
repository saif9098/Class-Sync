import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/auth';
import { toast } from 'react-toastify';
import logo from '../../Logo/brandlogo.png'
import { useSearch } from '../../../context/nav';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  
  const [auth, setAuth] = useAuth()
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
  useEffect(() => {
    // Reinitialize dropdowns after component mounts
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach((dropdown) => {
      new window.bootstrap.Dropdown(dropdown);
    });
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary " id='mynav'>

        <div className="container-fluid ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse bg-body-tertiary" id="navbarTogglerDemo01">
          <Link to="/" className="">
          <img
          src={logo} // Use the imported image here
          alt="Logo"
          width="170"
          height="50"
          className=""
        />
          </Link>
          <ul className="navbar-nav ms-auto">

              <li className="nav-item  fw-bold mx-2">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>




              {auth.user ? (
                <>
                <Dropdown className='me-5'>
                <Dropdown.Toggle variant="transparent" style={{ border: "none" }} id="dropdown-basic">
                {auth?.user?.role===1? auth?.user?.name +"(Admin)":auth?.user?.name+"(User)"}
                </Dropdown.Toggle>
          
                <Dropdown.Menu>
                <Dropdown.Item> <NavLink
                          to={
                            auth?.user?.role === 1 ? "/dashboard" : `/user/addresume`
                          }
                          className="dropdown-item"
                        >
                        Dashboard
                        </NavLink></Dropdown.Item>
                  <Dropdown.Item> <NavLink
                  to="/user/profile"
                  className="dropdown-item"
                >
                  Update Profile
                </NavLink></Dropdown.Item>
                  <Dropdown.Item ><NavLink
                  onClick={handleLogout}
                  to="/login"
                  className="dropdown-item"
                >
                  Logout
                </NavLink></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
               
                </>
             
              ) : (   <>
                  <li className="nav-item  fw-bold mx-2">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item fw-bold mx-2">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
             
            </ul>
          </div>
          </div>
      
      </nav>
    </>
  )
}

export default Navbar
