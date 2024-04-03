import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Logout from '../../components/Logout';

const SetProjectStatus = ({email}) => {
  
  const [projects, setProjects] = useState([]);
  const[loaded, setLoaded] = useState(false);
  let email1;
  const cookies = document.cookie;
  if (cookies) {
      const emailCookie = cookies.split(';')[0];
      if (emailCookie) {
          const emailValue = emailCookie.split('=')[1];
          if (emailValue) {
              email1 = emailValue.replaceAll('"', '');
              // Now you can use the email variable safely
              console.log(email);
          } else {
              console.error("Email value is undefined");
          }
      } else {
          console.error("Email cookie is undefined");
      }
  } else {
      console.error("No cookies found");
  }
  const [isAuthenticated, setIsAuthenticated] = useState(null)
    
    useEffect(
      function(){
       
        const checkAuthentication = async () => {
          try {
            const response = await axios.get('http://localhost:5001/check-auth-status');
            
            const isAuthenticated = response.data.isAuthenticated;
            console.log(isAuthenticated)    
            setIsAuthenticated(isAuthenticated)
          
    
          
          } catch (error) {
            console.error('Error checking authentication status:', error);
            return false;
          }
        };
        
        // Example usage
         checkAuthentication();
      }
    ,[]);
  useEffect(
    function(){
      axios.get('http://localhost:5001/admin/userStatus/fetch-'+email1)
      .then((result)=>{
        console.log(result);
        setProjects(result.data);
      })
      .catch(err=>console.log(err))
      setLoaded(true);
    }
  ,[email1]);
  function submitStatus(id){
    const selectedStatus = parseInt(document.getElementById(id).value);
    if(loaded && projects[0]){
        axios.get('http://localhost:5001/admin/userStatus/'+id+"-"+selectedStatus)
        .then(result=>console.log(result))
        .catch(err=>console.log(err));
    }
  }
  
  function displayDashboard(){
    if(loaded && projects[0]){
        for (let i = 0; i < projects.length; i++) {
            if(projects[i].status >= 5){
                return(<div>
                    <h3>Set the status for your project: {projects[i].projectTitle}</h3>
                    <label htmlFor={projects[i]._id}>Status</label>
                    <select id={projects[i]._id}>
                        <option value="5">I am still working on the project</option>
                        <option value="6">I have finished working on the project</option>
                        <option value="7">I have stopped working on the project and do not wish to continue</option>
                    </select>
                    <button className='btn btn-primary' name={projects[i]._id} 
                    onClick={function(e){submitStatus(e.target.name)}}>Submit Status</button>
                </div>);
            }
            else{
                return(
                <div>
                    <h3>Your project: {projects[i].projectTitle} is still in the process of being reviewed. You will be
                    able to change your project's status once you start working on it.</h3>
                </div>);
            }   
        }
  }
}
  return(
    isAuthenticated ?
    <div>
        <div className='card shadow p-3 mb-5 bg-white rounded'>
            <h1>Update Project Status</h1>
            {loaded && displayDashboard()}
        </div>
    </div> : <Logout/>
  );
}
export default SetProjectStatus;