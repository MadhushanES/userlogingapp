import React, { useState } from 'react';
import axios from 'axios';
import './reset.css';

const ResetPassword = () => {
  const [uemail, setUemail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      if (!uemail || !newPassword) {
        console.error('Please provide both uemail and newPassword');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/v1/resetpassword', {
        uemail,
        newPassword
      });

      alert("password reset"); 

      setUemail('');
      setNewPassword('');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className='container'>
    <div>
      <h2 className='header1'>Reset Password</h2>
      <div className='input3'>
        <label >Email:</label>
        <input className='input3' type="email" value={uemail} onChange={(e) => setUemail(e.target.value)} />
      </div>
      <div className='input3'>
        <label>New Password:</label>
        <input className='input3' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <div className='reset'>
      <button className='reset' onClick={handleResetPassword}>Reset Password</button>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
