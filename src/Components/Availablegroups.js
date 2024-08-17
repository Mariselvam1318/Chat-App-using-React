import React, { useContext, useEffect, useState } from "react";

import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import { AnimatePresence,motion } from "framer-motion"
// import { refreshSidebarFun } from "../Features/refreshSidebar";
import { myContext } from "./MainContainer"
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
function Availablegroups() {
    const logo = "https://cdn-icons-png.flaticon.com/512/2936/2936956.png"
    const { refresh, setRefresh } = useContext(myContext);

    // const lightTheme = useSelector((state) => state.themeKey);
    // const dispatch = useDispatch();
    const [groups, SetGroups] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("Data from LocalStorage : ", userData);
    const nav = useNavigate();
    if (!userData) {
      console.log("User not Authenticated");
      nav("/");
    }
  
    const user = userData.data;
    useEffect(() => {
      console.log("Users refreshed : ", user.token);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      axios
        .get("http://localhost:8080/chat/fetchGroups", config)
        .then((response) => {
          SetGroups(response.data);
        });
    }, [refresh]);
  
  return (
    <AnimatePresence>
<motion.div 
initial={{opacity:0,scale:0}}
animate={{opacity:1,scale:1}}
exit={{opacity:0,scale:0}}
transition={{
    ease:"anticipate",
    duration:"0.3", 
}}
className='list-container'>
    <div className='ug-header'>
        <img src={logo} style={{height:"2rem",width:"2rem"}}/>
        <p className='ug-title'>Available Groups</p>
        <IconButton
            className="icon"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <RefreshIcon />
          </IconButton>
    </div>
    <div className='sb-search'>
        <IconButton>
            <SearchIcon/>
        </IconButton> 
        <input placeholder='Search' className="search-box" />
    </div>
    <div className='ug-list'>
    {groups.map((group, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="list-item" 
                key={index}
                onClick={() => {
                  console.log("Creating chat with group", group.name);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  axios.put(
                    "http://localhost:8080/chat/addSelfToGroup",
                    {
                      chatId:group._id,
                      userId: userData.data._id,
                    },
                    config
                  );
                  // dispatch(refr  eshSidebarFun());
                }}
              >
                <p className="con-icon" >T</p>
                <p className="con-title">
                  {group.chatName}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
export default Availablegroups