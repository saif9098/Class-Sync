import React, { useEffect, useState } from 'react'
import '../styles/TeacherCard.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';

const YourStudents = () => {
    const [dataArr,setDataArr]=useState([]);
    const [msg, setMsg]=useState(null);
    const [feed, setFeed]=useState("N/A");
    const [attendance, setAttend]=useState(0);
    const [resource, setResource]=useState("N/A");
    const [profile, setProfile]=useState(null);
    const [batch, setBatch]=useState("");

    
    const getStudents =async ()=>{
         const data =await axios.post("http://localhost:7078/api/v1/msg/get-connected-students",{batch:batch});
         setDataArr(data.data);
    }
    useEffect(() => {
    getStudents()
    }, [batch])
    const deleteTeacher= async(id)=>{
    
        const resp = await axios.delete(`http://localhost:7078/api/v1/msg/delete-teacher/${id}`);
        getStudents()
        toast.success(resp.data.message)
    }
    const sendMsg= async (id)=>{
        const resp = await axios.patch(`http://localhost:7078/api/v1/msg/edit-msg/${id}`, {message:feed,attendance:attendance,resource:resource});
        toast.success(resp.data.message)
        getStudents()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setResource(reader.result); // Base64 string
        };
    
        if (file) {
          reader.readAsDataURL(file); // Convert file to Base64 string
        }
      };
  const handleMsg =(data)=>{
    setMsg(data);
    setFeed(data.message);
    setAttend(data.attendance);
    setResource(data.resource)
  }

  const handleProfile=async(id)=>{
    let data =await axios.get(`http://localhost:7078/api/v1/profile/get-student-profile/${id}`)
    setProfile(data.data)
  }
  return (
    <Layout>
    <div className="d-flex flex-wrap">
    <div id='nameBox'>
    <h3 className='nameheading'>Connected Students</h3>
    <select
    value={batch}
    onChange={(e)=>setBatch(e.target.value)}
    className="form-control exampleInputEmail1"
    placeholder='--Choose batch--'

  > <option value="" disabled> -- Choose batch --</option>
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <option value="2025">2025</option>
    <option value="2026">2026</option>
    <option value="2027">2027</option>
    <option value="2028">2028</option>
    <option value="2029">2029</option>
    <option value="2030">2030</option>
  </select>
  <h6 className='fw-bold text-center mt-1'>{dataArr.length} found</h6>
    {dataArr?.map(data=><>
        <div className="border rounded-3 my-2 mx-3 bg-white p-2" id='smallCard'>
    
        <div className="">
      <h5>{data.studentName}</h5>
      
      </div>
      <div id='mybtn' className='d-flex flex-wrap gap-2'>
      <button className='btn btn-sm btn-outline-primary' onClick={()=>handleMsg(data)}>Notifications</button>
      <button className='btn btn-sm btn-outline-danger' onClick={()=>{deleteTeacher(data._id)}}>Delete</button>
      </div>
      </div>
      </>)}
      </div>
      
      <div id="detailBox" className='p-2'>
      {msg? <>
        <div id="myTransition">
      <h4 className="text-primary">{msg.studentName}</h4>
      <br />
      <div className="d-flex gap-1">
      <h5><b>Attendance (in %) : </b></h5>
      <input type="number"
      value={attendance}
      onChange={(e)=>setAttend(e.target.value)}
      className='attendance'
      placeholder='Enter attendance here'
      />
      </div>
      <br />
      <div className="">
      <h5><b>Information & Message:</b></h5>
      <textarea 
      value={feed}
      onChange={(e)=>setFeed(e.target.value)}
      placeholder='Enter your message here'
      id='feedback'
      />
      </div>
   
     
     <h5><b>Attach Resource :</b></h5>
     <input type="file" accept=".pdf" className="form-control w-100" onChange={handleFileChange} />
                <div className='' >

                            {resource ? (
                                <iframe
                                    src={resource}
                                    title="PDF Viewer"
                                    width="250px"
                                    height="280px"
                                />
                            ) : (
                                <p>No previous attached resource found</p>
                            )}

                        </div>
                        
      <button className='btn btn-sm btn-outline-primary my-3 w-100' onClick={()=>sendMsg(msg._id)} >Send message</button>
       <h5><b>Feedback & doubts:</b></h5>
      <h6>{msg.feedback}</h6>
      <br />
   
     <button className='btn btn-sm btn-outline-info' onClick={()=>handleProfile(msg.student)}>Check out the profile</button>
     </div>
     </>: ""}
      {profile? <>
        <div id="myTransition">
      <h5><b>Percentage/Cgpa : </b>{profile.marks}</h5>
     
      <br />
      <h5><b>Skills & technologies:</b></h5>
      <div className='d-flex flex-wrap gap-2'>
                        {profile.skillsArr?.map((skill) => (
                            <p className="mx-1 fw-normal skillfont">{skill}</p>
                        ))}

                    </div>
   
     
     <h5><b>Resume/Cv :</b></h5>
                <div className='' >

                            {profile.resume ? (
                                <iframe
                                    src={profile.resume}
                                    title="PDF Viewer"
                                    width="250px"
                                    height="280px"
                                />
                            ) : (
                                <p>No resume found</p>
                            )}

                        </div>
                        
     </div>
     </>: ""}

      </div>
      </div>
    </Layout>
   
  )
}

export default YourStudents
