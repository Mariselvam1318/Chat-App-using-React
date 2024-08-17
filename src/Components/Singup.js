import React from 'react';
import { TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./my-style.css";

function Signup() {
  const logo = "https://cdn-icons-png.flaticon.com/512/2936/2936956.png";
  const navigate = useNavigate(); // Create a useNavigate hook

  const handleLoginClick = () => {
    navigate('/'); // Navigate to the login page path
  };

  return (
    <div className='signup-container'>
      <div className='img-container'>
        <img src={logo} className='welcome-logo' alt='Live Chat Logo' />
      </div>
      <div className='signup-box'>
        <p className='signup-text'>Create an Account</p>
        {/* Add signup form fields */}
        <TextField
          id="standard-basic"
          label="Enter Username"
          variant="outlined"
        />
        <TextField
          id="standard-basic"
          label="Enter Email Address"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="new-password"
          variant="outlined"
        />
        {/* Add signup button */}
        <Button variant="contained">Sign Up</Button>
        {/* Add link/button for redirection to login page */}
        <p>Already have an account? <Link onClick={handleLoginClick}>Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
