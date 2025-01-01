import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/InnerPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";


const Dashboard = () => {
  const initialjobs = []
  const [jobs, setjobs] = useState(initialjobs)
  const navigate = useNavigate()
  const deleteJob = async (id) => {

    let resp = await axios.delete(`http://localhost:7078/api/v1/job/delete-job/${id}`);
    getmyjobs()
  }
  const getmyjobs = async () => {

    let resp = await axios.get("http://localhost:7078/api/v1/job/get-myjob");
    // const json = await resp.json()
    console.log(resp.data)
    setjobs(resp.data)

  }
  useEffect(() => {
    getmyjobs();
  }, [])
  const arrCnvrt = (str) => {
    return str.split(',').map(item => item.trim())
  }
  const arrCnvrt2 = (str) => {
    return str.split('.').map(item => item.trim()).filter(item => item !== '');
  }

  const handleEdit = (job, id) => {
    localStorage.setItem("job", JSON.stringify(job))
    navigate(`/dashboard/update-job/${id}`)
  }

  return (

    <Layout >
      <div className="cotainer-md p-1">
        {jobs?.map((p) => (

          <div className="border rounded-2 m-1 p-2" id="box" >
            <div className="d-flex flex-wrap justify-content-between">
              <div className="d-flex flex-wrap gap-3">
                <div className="fs-5 text-dark fw-bold">{p.company}</div>
                <div className="fs-5 text-danger">[{p.jobrole}]</div>
                <div className="fs-5"><p>{p.jobType} ( <i class="fa-solid fa-location-dot"></i> {p.workLocation})</p></div>
              </div>

              <div className="d-flex flex-wrap gap-3">
                <div> <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(p, p._id)}>Edit</button></div>
                <div> <button className="btn btn-outline-danger btn-sm" onClick={() => deleteJob(p._id)}>Delete</button></div>
              </div>
            </div>

            <div className="fw-bold">Description/Responsibility :
            <ul className="fw-normal fs-6">
            {arrCnvrt2(p.jobDescription)?.map((elem)=>(
              <li>{elem}</li>
              ))
              }
              </ul>
            </div>
            <div className="d-flex flex-wrap fw-bold">Eligibility Criteria:
            {arrCnvrt(p.eligibility)?.map((elem)=>(
              <p className="mx-1 border border-sm-dark rounded-3 px-1 fw-normal">{elem}</p>
              ))
              }
            </div>
            <div className="d-flex flex-wrap fw-bold">Required Skills :
            {arrCnvrt(p.requiredSkills)?.map((elem)=>(
              <p className="mx-1 border border-sm-dark rounded-3 px-1 fw-normal">{elem}</p>
              ))
              }
            </div>
            <div className="d-flex flex-wrap gap-3 fw-bold">
            <div className=""><p>Salary: <span className="text-success">{p.salary}</span></p></div>
            <div className=""><p>| {p.workDays}</p></div>
            </div>
            <div className="d-flex flex-wrap justify-content-between">
            
              <div className="">Official Website: <Link to={`https://${p.Yourweb}`}><i class="fa-solid fa-globe"></i> {p.Yourweb}</Link></div>

            <div className="d-flex flex-wrap gap-3">
            <div className=""><p>Deadline: {p.deadline}</p></div>
            <div className=""><h5>| Posted : <span className="text-primary">{moment(p.createdAt).fromNow()}</span></h5></div>
            </div>
          </div>

          </div>



        ))}
      </div>

    </Layout>
  )
}

export default Dashboard;
