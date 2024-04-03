import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from '../AuthContext';
import Logo from '../images/Logo.jpg';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();
  const history = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://research-portal-server-9.onrender.com/authl/login', { email, password });
      const { data } = response;
      console.log(data);

      if (data.error === 'User not found') {
        toast.error('User not found, please register', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      } else if (data.error === 'Incorrect password') {
        toast.error('Incorrect password, please enter the correct password', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      } else if (data.message === 'ok') {
        // Login successful, redirect based on role
        if (data.role === 'admin') {
          history('/admin', { state: { email: email, role: data.role } });
        } else if (data.role === 'admin2') {
          history('/admin2', { state: { email: email, role: data.role } });
        } else if (data.role === 'admin3') {
          history('/admin3', { state: { email: email, role: data.role } });
        } else {
          history('/user', { state: { email: email, role: data.role } });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle other errors (e.g., network error)
      toast.error('An error occurred, please try again later', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-right mt-3">
        <Link to="/" className="btn btn-primary" style={{ marginBottom: '20px', backgroundColor: '#11676d', border: 'none', fontSize: '20px' }}>
          Back to Home
        </Link>
      </div>
      <div className="row justify-content-between align-items-center">
        <div className="col-md-4 text-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="img-fluid" style={{ maxHeight: '200px' }} />
          </Link>
        </div>
        <div className="col-xs-12 col-md-6">
          <h1 className="mb-4">Log in</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); login(e.target.value); }}
              />
            </div>
            <div className="mb-3 password-input-container">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password you entered when you registered"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="password-toggle-container">
                  <button
                    className="btn btn-outline-secondary password-toggle-button"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                style={{
                  marginBottom: '90px',
                  marginLeft: '5px',
                  backgroundColor: 'orange',
                  border: 'none',
                  fontSize: '20px',
                }}
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
