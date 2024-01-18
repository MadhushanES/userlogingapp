
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import React, { useState } from 'react';


const Login = () => {
  const navigate = useNavigate();

  const [upass, setUpass] = useState('');
  const [uemail, setUemail] = useState('');
  

  // Event handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', { uemail, upass });
      console.log(response.data); 
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text"> Login </div>
      </div>
      <form onSubmit={handleLogin}>
        <div className="inputs">
          <div className="input">
            <input
              type="email"
              placeholder="  E-mail"
              name="uemail"
              value={uemail}
              onChange={(event) => setUemail(event.target.value)}
            />
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="  Password"
              name="upass"
              value={upass}
              onChange={(event) => setUpass(event.target.value)}
            />
          </div>

          <div className="forgot-password">
            Forgot Password? 
            <Link to="/resetpassword">
              <span>Reset password</span>
              </Link>
          </div>

          <div className="submit-container">
            <button type="submit" className="submit_">
              Login
            </button>
          </div>
        </div>
      </form>
      

      <div className="forgot-password">
            Don't have an account? 
            <Link to="/register">
              <span>Register</span>
              </Link>
          </div>
    </div>
  );
};

export default Login;
