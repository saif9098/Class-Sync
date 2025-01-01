import React, { useEffect, useState } from 'react'
import skillsdata from '../components/ResumeParts/skills.json'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/auth';
import Layout from '../components/Layout/Layout';

const AdminInfo = () => {
 
    //education states
    const [college, setCollege] = useState("");
    const [teachingIn, setTeachingIn] = useState("");
    const [course, setCourse] = useState("");
     const [stream, setStream] = useState("");
    const [skills, setskill] = useState("");
    const [skillsArr,setskillArr] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [auth,setAuth]=useAuth()

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profilResp, setProfilResp] = useState([]);
    const getprofile = async () => {

        let resp = await axios.get("http://localhost:7078/api/v1/profile/get-admin-profile");
        setProfilResp(resp.data)
       
    
      }
      useEffect(() => {
        getprofile(); 
      }, [])
    useEffect(() => {  
        setCollege(profilResp.college)
    setCourse(profilResp.qualification)
    setTeachingIn(profilResp.teachingIn)
    setStream(profilResp.stream)
    if(profilResp.skillsArr){
    setskillArr(profilResp.skillsArr)
    }

    }, [profilResp])
    const handleskillChange = (e) => {
        const input = e.target.value;
        setskill(input);

        if (input.length > 1) {
            const filteredSuggestions = skillsdata.skills.filter(item =>
                item.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    const addskill = () => {
        if(skills!==""){
       setskillArr([...skillsArr,skills]);
       setskill("");
    }
       
    }
    // Handle suggestion click (Optional)
    const handleSuggestionClick = (suggestion) => {
        setskill(suggestion);
        setSuggestions([]); // Clear suggestions after selection
    };
   
      const handleSubmit = async (e) => {
        
        try {
         if(!college || !teachingIn || !course || !stream || !skillsArr){
            return toast.error("Please Provide Neccessary Fields");
         }
          dispatch(showLoading());
     const name =auth?.user.title+ " "+ auth?.user.name +" "+auth?.user.lastName ;
          const profileData = {
            name,
            college,
            teachingIn,
            stream,
            course,
            skillsArr
          };
          
          const { data } = await axios.post("http://localhost:7078/api/v1/profile/admin-profile", profileData);
          dispatch(hideLoading());
          if (data.success) {
            toast.success(data.message);
            
            navigate("/user/resume");
          }
        } catch (error) {
          dispatch(hideLoading());
          toast.error(error.response.data.message);
          console.log(error);
        }
      };
    return (
        <Layout>
            <div className=''>
                <div className='resumeCard'>
                    <h5 className='fw-bold'>Last/Current Educational Details :</h5>

                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            className="inputone"
                            placeholder="College/University where you studied"
                            required
                        />
                        <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="inputthree"
                        placeholder="Qualification"
                        required
                    />
                    </div>
                    <div className="d-flex gap-2">
                    <input
                            type="text"
                            value={teachingIn}
                            onChange={(e) => setTeachingIn(e.target.value)}
                            className="inputone"
                            placeholder="Enter Teaching Institution"
                            required
                        />
                    
                        <input
                            type="text"
                            value={stream}
                            onChange={(e) => setStream(e.target.value)}
                            className="inputthree"
                            placeholder="Department/Stream"

                        />
                    </div>
                  

                </div>
              
                <div className="resumeCard">
                    <h5 className='fw-bold'>Skills Section :</h5>
                    <div className="d-flex flex-wrap">
                        <input
                            type="text"
                            value={skills}
                            onChange={handleskillChange}
                            className="inputtwo"
                            placeholder="Enter Skill"

                        />
                        <button
                            className="btn btn-outline-dark btn-sm mb-3  rounded-2 ms-2"
                            onClick={addskill}
                        >Add</button>
                    </div>
                    <div className='parentbox' >
                        {suggestions.length > 0 && (
                            <div className='suggestBox'>
                                {suggestions.map((suggestion, index) => (
                                    <p
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}

                                    >
                                        {suggestion}
                                    </p>
                                ))}
                                </div>
                            
                        )}
                    </div>
                    <div className='d-flex flex-wrap gap-2'>
                        {skillsArr?.map((skill) => (
                            <p className="mx-1 fw-normal skillfont">{skill}</p>
                        ))}

                    </div>
                </div>
               
            <div className='text-center my-4'>
            <button className='btn btn-sm btn-outline-dark px-4 py-1 fs-5' onClick={handleSubmit}> Submit Your Profile</button>
            </div>
            </div>
        </Layout>
    )
}


export default AdminInfo
