import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dp from '../Images/ssa.png';
import './profile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: token
        };

        const response = await axios.get('http://localhost:5000/api/v1/userprofile', { headers });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, []);

  const deleteProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: token
      };

      const response = await axios.delete('http://localhost:5000/api/v1/userprofile', { headers });
      alert('User profile deleted' + JSON.stringify(response));

      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting user profile:', error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div>
      <div className='header3'>
        <div className='text3'> Profile </div>
      </div>
      <div className='container2'>
        <div className='container3'></div>
        <div>
          <div className='image'>
            <img src={dp} alt='profile picture' />
          </div>
        </div>
        <div className='username'>{userData?.user?.UserName}</div>
        <div className='username'>{userData?.user?.UserEmail}</div>
        <div className='submit5'><button onClick={() => deleteProfile()}> Delete Profile </button></div>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
