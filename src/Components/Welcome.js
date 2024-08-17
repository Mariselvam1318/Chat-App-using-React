import React from 'react';
import "./my-style.css"
import { useNavigate } from 'react-router';
import {  motion } from "framer-motion";
function Welcome() {
  const logo = "https://cdn-icons-png.flaticon.com/512/2936/2936956.png"
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData)
  const nav = useNavigate();
  if(!userData){
    console.log("User Not Authenticated");
    nav("/");
  }
  return (
    <div className='welcome-container'>
      <motion.img 
      drag
      whileTop={{scale:1.05,rotate:360}}
      src={logo} 
      className='welcome-logo' 
      alt='Live Chat Logo' 
      />
      <b>Hi,{userData.data.name}👋</b>
      <p>Welcome to our live chat!</p>
    </div>
  );
}

export default Welcome;
