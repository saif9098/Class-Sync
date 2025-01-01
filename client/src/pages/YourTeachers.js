import React, { useEffect, useState } from 'react'
import Profile from '../components/ResumeParts/profile'
import '../styles/TeacherCard.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const YourTeachers = () => {
    const [dataArr,setDataArr]=useState([]);
    const [msg, setMsg]=useState(null);
    const [feed, setFeed]=useState("");
    const getTeacher =async ()=>{
         const data =await axios.get("http://localhost:7078/api/v1/msg/get-connected-teacher");
         setDataArr(data.data);
    }
    useEffect(() => {
    getTeacher()
    }, [])
    const deleteTeacher= async(id)=>{
    
        const resp = await axios.delete(`http://localhost:7078/api/v1/msg/delete-teacher/${id}`);
        getTeacher()
        toast.success(resp.data.message)
    }
    const sendFeed= async (id)=>{
        const resp = await axios.patch(`http://localhost:7078/api/v1/msg/send-feed/${id}`, {'feed':feed});
        toast.success(resp.data.message)
    }
  return (
    <Profile>
    <div className="d-flex flex-wrap">
    <div id='nameBox'>
    <h3 className='nameheading'>Connected Teachers</h3>
    <h6 className='fw-bold text-center mt-1'>{dataArr.length} found</h6>
    {dataArr?.map(data=><>
        <div className="border rounded-3 my-2 mx-3 bg-white p-2" id='smallCard'>
    
        <div className="">
      <h5>{data.teacherName}</h5>
      
      </div>
      <div id='mybtn' className='d-flex flex-wrap gap-2'>
      <button className='btn btn-sm btn-outline-primary' onClick={()=>setMsg(data)}>Notifications</button>
      <button className='btn btn-sm btn-outline-danger' onClick={()=>{deleteTeacher(data._id)}}>Delete</button>
      </div>
      </div>
      </>)}
      </div>
      
      <div id="detailBox" className='p-2'>
      {msg? <>
        <div id="myTransition">
      <h4 className="text-primary">{msg.teacherName}</h4>
      <br />
      <h5><b>Attendance : </b>66%</h5>
      <br />
      <h5><b>Message :</b></h5>
      <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero dolor voluptates ullam magnam eligendi, sed harum, quasi repellat temporibus cupiditate reprehenderit eius earum atque provident totam aliquid molestiae id qui.</h6>
      <br />
     
     <h5><b>Attached Resource :</b></h5>
     <br />
     <div className="d-flex flex-column">
     <h5><b>Feedbacks & Issues :</b></h5>
     <textarea 
     value={feed}
     onChange={(e)=>setFeed(e.target.value)}
     placeholder='Enter your feedback/issues here'
     id='feedback'
     />
     <button className='btn btn-sm btn-outline-primary my-2' onClick={()=>sendFeed(msg._id)} >Send</button>
     </div>
     <button className='btn btn-sm btn-outline-info' >Check Other Common Resources</button>
     </div>
     </>: ""}
      </div>
      </div>
    </Profile>
   
  )
}

export default YourTeachers
