import React from 'react'
import { ProfileMenu } from '../Layout/Menus/Profilemenu';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';

const Profile = ({children}) => {
    const location = useLocation();
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
    <div className="resumebox">
      <div className="profile">
      <div className="profileinfo">
      <div className="profilepic">
      <img src={auth?.user?.photo} alt="" height={90} width={90} />
      </div>
      <h5 className='fw-bold'>{auth?.user.name}</h5>
      <h6>{auth.user.email}</h6>
      </div>
      <div className="profileMenu">
      {ProfileMenu.map((menu) => {
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
      <div className="resumedetail">
      {children}
      </div>

    </div>
  )
}

export default Profile
