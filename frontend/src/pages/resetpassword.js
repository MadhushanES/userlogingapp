import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Reset Password</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={uemail} onChange={(e) => setUemail(e.target.value)} />
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
