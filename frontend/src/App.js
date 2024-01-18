import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ResetPassword from './pages/resetpassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}//app madhushan

export default App;
