import React from 'react'
import logo from '../../components/Logo/brandlogo.png'

const Footer = () => {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <div>

            <div className="footer">

                <div className="footerleft ">
                    <div className="d-flex ">
                        <img
                            src={logo} // Use the imported image here
                            alt="Logo"
                            width="170"
                            height="75"
                            className=""
                        />
                        <h3 className='ftrtxt'>Spreading knowledge become easy</h3>
                    </div>
                    <div className="ftrcontact m-2 p-1 px-4">
                        <h5>Stay Connected</h5>
                        <h6><i class="fa-solid fa-phone"></i> 8883283293</h6>
                        <h6><i class="fa-solid fa-envelope"></i> saifrajamarch647@gmail.com</h6>

                    </div>
                    <div className="d-flex flex-wrap gap-4 text-white  p-1 px-4">
                        <h4><i class="fa-brands fa-instagram"></i></h4>
                        <h4><i class="fa-brands fa-facebook"></i></h4>
                        <h4><i class="fa-brands fa-linkedin"></i></h4>
                        <h4><i class="fa-brands fa-github"></i></h4>
                        <h4><i class="fa-brands fa-youtube"></i></h4>
                        <h4><i class="fa-brands fa-twitter"></i></h4>
                    </div>
                    <div className="copyright">
                        Copyright © {year} SR
                    </div>
                </div>
                <div className="footerRight p-5 ">
                <div className="d-flex justify-content-between text-white">
                <div className='more'>
                  <h5 className="fw-bold">Our Solutions</h5>
                  <h6>Guidance</h6>
                  <h6>Placement</h6>
                  <h6>Assessment</h6>
                  </div>
                <div className='more'>
                  <h5 className="fw-bold">Participate</h5>
                  <h6>Events</h6>
                  <h6>Comptitions</h6>
                  <h6>Conferences</h6>
                  </div>
                <div className='more'>
                  <h5 className="fw-bold">Apply</h5>
                  <h6>Jobs</h6>
                  <h6>Internships</h6>
                  <h6>Courses</h6>
                  </div>
                </div>
                <div className="d-flex flex-wrap mt-5 gap-4 text-primary">
                <h6>About Us  |</h6>
                  <h6>Contact Us  |</h6>
                  <h6>About Us  |</h6>
                  <h6>Carrier  |</h6>
                  <h6>Guidlines  |</h6>
                  <h6>FAQs  |</h6>
                  <h6>Terms & Condition  |</h6>
                  <h6>Privacy Policy  |</h6>
                  
                  </div>
                  </div>
            </div>

        </div>
    )
}

export default Footer
