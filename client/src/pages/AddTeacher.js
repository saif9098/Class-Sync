import React, { useEffect, useState } from 'react'
import Profile from '../components/ResumeParts/profile'
import '../styles/TeacherCard.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';

const AddTeacher = () => {
    const [dataArr,setDataArr]=useState([]);
    const [auth]=useAuth();
    const studentName =auth?.user.name+ " "+auth?.user.lastName;
    const getTeacher =async ()=>{
         const data =await axios.get("http://localhost:7078/api/v1/profile/get-yourteacher-profile");
         setDataArr(data.data);
    }
    useEffect(() => {
    getTeacher()
    }, [])
    const addTeacher= async(teacherId,name)=>{
    
        const resp = await axios.post("http://localhost:7078/api/v1/msg/add-teacher",{teacherId:teacherId,
        name:name, studentName:studentName})
        toast.success(resp.data.message)
    }
  return (
    <Profile>
    {dataArr?.map(data=><>
    <div className="border rounded-3 my-2 mx-3 bg-white p-2" id='myCard'>
      <div className="d-flex flex-wrap gap-3 fontsmall">
      <div className='teacherPic mx-2'>
        <img src={data.photo} alt="" height={100} width={100} />
      </div>
      <div className="">
      <h5 className='text-danger'>{data.name} [{data.stream}]</h5>
      <h6><b>Qualfications :</b> {data.qualification} From  {data.college}</h6>
      <h6><b>Area of interest :</b>  {data.skillsArr?.map((elem) => (
        <span className="mx-1 fw-normal fontset">{elem}</span>
      ))
      }</h6>

      </div>
      <div id='mybtn'>
      <button className='btn btn-sm btn-outline-primary' onClick={()=>addTeacher(data.createdBy,data.name)}>Connect</button>
      </div>
      </div>
    </div>
    </>)}
    </Profile>
   
  )
}

export default AddTeacher
