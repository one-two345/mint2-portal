import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
const ForgetPassowed = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
    
        axios.post('https://research-portal-server-9.onrender.com/updatepassword/forgot', {email:email} )  
          .then((result) => {
            console.log(result.data);
            if (result.data.message === 'sent') {
                toast.success("Check your email,it will expire after one day!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    draggable: false
                });
                
            } else {
                toast.error("please try again", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    draggable: false
                });
                
            }
          })
          .catch((error) => {
            console.log('Error occurred during sending the data for reset password' + error);
          });
      }
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email to reset your password</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        <div style={{textAlign:"right"}}>
        <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
        </form>
        
      </div>
    </div>
    <ToastContainer/>
  </div>
  )
}

export default ForgetPassowed
