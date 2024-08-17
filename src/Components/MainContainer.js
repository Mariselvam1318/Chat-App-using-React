
import React, { createContext, useState } from 'react';
import "./my-style.css"
import Slidebar from './Slidebar'
import { Outlet } from 'react-router-dom';

export const myContext = createContext();
function MainContainer() {
  const [refresh, setRefresh] = useState(true);
  return (
    // 
    <div className='main-container' >
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
      <Slidebar/>
      <Outlet/>
      </myContext.Provider>
      {/* <Chatarea props={conversations[0]}/>
      <Welcome/>
      <Creategroup/>
      <Onlineusers/>
      <Availablegroups/>  */}
    </div>
  );
}

export default MainContainer