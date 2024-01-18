import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { Link } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [upass, setUpass] = useState('');
  const [uemail, setUemail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleRegister = (e) => {
    e.preventDefault();
    if (upass !== confirmPassword) {
              alert("Passwords don't match. Please check again.");
              return;
            }
    
    axios.post( 'http://localhost:5000/api/v1/Signup', {uname, uemail, upass })
    .then(result => {
        console.log(result);
        alert('User Registered')

        navigate("/");
        
    })
    .catch(err => console.log(err))
    ;
}
 

  return (
    <div className='container'>
      <div className='header1'>
        <div className='text'> SignUp </div>
      </div>
      <form onSubmit={handleRegister}>
        <div className='inputs1'>
          <div className='input1'>
            <input
              type='text'
              placeholder='  Name'
              name='uname'
             
              onChange={(event)=>setUname(event.target.value)}
            />
          </div>

          <div className='input1'>
            <input
              type='email'
              placeholder='  E-mail'
              name='uemail'
              
              onChange={(event)=>setUemail(event.target.value)}
            />
          </div>

          <div className='input1'>
            <input
              type='password'
              placeholder='  Password'
              name='upass'
             
              onChange={(event)=>setUpass(event.target.value)}
            />
          </div>
          <div className='input1'>
          <input type="password"  placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)} />

          </div>
          


          <div className='submit-container1'>
            <button type='submit' className='submit1'>
              Register
            </button>
          </div>
        </div>
      </form>
      <div className='submit-container1'>
      <Link to={'/'}>      
      <div className='submit2' >
        Login
      </div></Link>
      </div>

    </div>
  );
};

export default Registration;


