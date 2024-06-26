// src/components/Footer.js

import React from 'react';
import FooterForm from '../components/footerComponents/FooterForm';
import { Link } from 'react-router-dom';
import { FaPhone, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { RiMapPin2Fill, RiMailFill } from 'react-icons/ri';
import Logo from '../images/Logo.jpg';
import GroupLogo from '../images/GroupLogo.png'; 
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    //
    <footer style={{background: 'linear-gradient(to top, black, #16676d )', color: 'white',padding:'10px'}}>


      <div className="container py-4">
        <div className="row ">
               
          
                   {/* Left Column */}
            <div className="col-md-4 mb-4" >
            <FooterForm />
            </div>

                  {/* Center Column */}
            <div className="col-md-4 mb-4 d-flex flex-column align-items-center text-center text-lg-start">
   
              <div  style={{justifyContent:'center',alignContent:'center',marginLeft:'20px',marginTop:'5px'}}>
              <h5 style={{marginBottom:'25px'}}>Quick Links</h5>
             
              <ul className="list-unstyled">
                <li><a href="/" style={{color:"white",marginTop:'40px'}}>Home</a></li>
                <li><a href="/announcements" style={{color:"white"}}>Announcements</a></li>
                <li><a href="/resources/accepted-projects" style={{color:"white"}}>Accepted Projects</a></li>
                <li><a href="/resources/publications" style={{color:"white"}}>Publications</a></li>
                <li><a href="/institutes" style={{color:"white"}}>Institutes</a></li>
                <li><a href="/collaborations" style={{color:"white"}}>Collaborations</a></li>
                <li><a href="/aboutus" style={{color:"white"}}>About Us</a></li>
                <li><a href="/news" style={{color:"white"}}>News</a></li>
              </ul>
              </div>
            </div>

                {/* Right Column */}
            <div className="col-md-4 mb-4 text-center">
            <div style={{justifyContent:'center',alignItems:'center'}}>
              <a href= '/' > 
                <img src={Logo} alt="Logo" style={{ borderRadius: '50%', width:'100px',height:'100px',marginBottom:'10px' ,marginLeft:'20px'}} />
              </a> 
              </div>
              <h5 className="m-3">Contact Us</h5>
              <ul className="list-unstyled">
                <li className='mb-2 mt-4'><FaPhone /> +25111265737</li>
                <li className='mb-2'><RiMailFill /> contact@mint.gov.et</li>
                <li><RiMapPin2Fill /> Addis Ababa, Ethiopia</li>
                <div className="mt-3">
                  <a href="https://www.facebook.com/MInT.Ethiopia/" className="me-2" style={{color:"orange"}} target="_blank"><FaFacebook /></a>
                  <a href="https://twitter.com/ministryofinno2?lang=en" className="me-2" style={{color:"orange"}} target="_blank"><FaTwitter /></a>
                  <a href="https://www.linkedin.com/company/ministry-of-innovation-and-technology-ethiopia/?originalSubdomain=et" className="me-2" style={{color:"orange"}} target="_blank"><FaLinkedin /></a>  
                </div>
              </ul>
            </div>        
        </div>
        

        {/* Copyright */}
        <div className="text-center">
          <h5 className="text-center">Developed By</h5>
          <br></br>
          <br></br>
          <span> 
            <a href="OurWebsiteURL" target="_blank" > 
              <img src={GroupLogo} alt="Group Logo" style={{ width: '250px', height: '250px',marginBottom: "-30px", marginTop:"-110px" }} />
            </a>
            <br />
            <FaRegCopyright /> {currentYear} MinT in Collaboration with HexAmigos. All rights Reserved. 
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
