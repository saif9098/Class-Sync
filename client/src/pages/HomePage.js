import React, { useState } from "react";
import "../styles/Homepage.css";
import demo1 from "../components/Logo/demo1.png"
import demo2 from "../components/Logo/demo2.png"
import Footer from "../components/Homeparts/Footer";
const HomePage = () => {
  const [hidden, setHidden]=useState(false);
  const [hidden2, setHidden2]=useState(false);
  const handleHide =()=>{
    setHidden(true)
  }
  const handleHide2 =()=>{
    setHidden2(true)
  }
  return (
    <>
      
      <div className="poster">
      <div className="d-flex gap-2 z-4">
      <div className={`demo1 ${hidden&&"d-none"}`}>
      <img src={demo1} alt="demo" width={400} height={210}/>
      <i className="fa-regular fa-circle-xmark cutCircle" onClick={handleHide}></i>
      </div>
      <div className={`demo2 ${hidden2&&"d-none"}`}>
      <img src={demo2} alt="demo" width={400} height={210}/>
      <i className="fa-regular fa-circle-xmark cutCircle" onClick={handleHide2}></i>
      </div>
      </div>
      </div>
          
      <div>
      <Footer/>
      </div>
    </>
  );
};

export default HomePage;
