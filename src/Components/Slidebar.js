import React, { useContext, useEffect, useState } from 'react'
import "./my-style.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
// import Convoitems from './Convoitems';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { myContext } from "./MainContainer";
import axios from 'axios';
function Slidebar() {
    
    const navigate =useNavigate();
    const[lighttheme,setLightTheme]=useState(true);
    const { refresh, setRefresh } = useContext(myContext);
    // console.log("Context API : refresh : ", refresh);
    const[conversations,setConversations]=useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const nav = useNavigate();
    if (!userData) {
      console.log("User not Authenticated");
      nav("/");
    }
    const user = userData.data;
  useEffect(() => {
    // console.log("Sidebar : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get("http://localhost:8080/chat/", config).then((response) => {
      console.log("Data refresh in sidebar ", response.data);
      setConversations(response.data);
      // setRefresh(!refresh);
    });
  }, [refresh]);
  return (
    <div className='slidebar-container'>
        <div className={`sb-header ${lighttheme ? '' : 'dark'}`}>
            <div className='other-icons'>
                <IconButton
                onClick={()=>{
                    nav("/app");
                }}>
                    <AccountCircleIcon className={`icon ${lighttheme ? '' : 'dark'}`}/>
                </IconButton>
            
                <IconButton 
                onClick={()=>{
                    navigate('online-users')
                    }}>
                    <PersonAddIcon className={`icon ${lighttheme ? '' : 'dark'}`}/>
                </IconButton>

                <IconButton 
                onClick={()=>{
                    navigate('available-groups')
                    }}>
                    <GroupAddIcon className={`icon ${lighttheme ? '' : 'dark'}`}/>
                </IconButton>
                
                <IconButton 
                onClick={()=>{
                    navigate('create-group')
                    }}>
                    <AddCircleIcon className={`icon ${lighttheme ? '' : 'dark'}`}/>
                </IconButton>
                
                <IconButton onClick={()=>{
                    setLightTheme((preValue)=>{
                        return !preValue;
                    });
                }}>
                    {lighttheme && (<NightlightIcon className={`icon ${lighttheme ? '' : 'dark'}`}/>)}
                    {!lighttheme && (<LightModeIcon className={`icon ${lighttheme ? '' : 'dark'}`}/>)}
                </IconButton>

                <IconButton
                onClick={()=>{
                    localStorage.removeItem("userData");
                    navigate("/");
                }}
                >
                    <ExitToAppIcon className={`icon ${lighttheme ? '' : 'dark'}`}/>
                </IconButton>
            </div>  
        </div>
        <div className={`sb-search ${lighttheme ? '' : 'dark'}`}>
            <IconButton>
                <SearchIcon/>
            </IconButton> 
            <input placeholder='search' className={`search-box ${lighttheme ? '' : 'dark'}`} />
        </div>
        <div className={`sb-convo ${lighttheme ? '' : 'dark'}`}>
            {conversations.map((conversation,index)=>{
                var chatName ="";
                if(conversation.isGroupChat){
                  chatName = conversation.chatName;
                }
                else{
                  conversation.users.map((user)=>{
                    if(user._id!=userData.data._id){
                      chatName=user.name;
                    }
                  });
                }
                // if (conversation.users.length === 1) {
                //     return <div key={index}>

                //     </div>;
                //   }
                  if (conversation.latestMessage === undefined) {
                    return (
                        <div
                          key={index}
                          onClick={() => {
                            console.log("Refresh fired from sidebar");
                            // dispatch(refreshSidebarFun());
                            setRefresh(!refresh);
                          }}
                        >
                          <div
                            key={index}
                            className="conversation-container"
                            onClick={() => {
                              navigate("chat/" +conversation._id +"&" +chatName);
                            }}
                            // dispatch change to refresh so as to update chatArea
                          >
                            <p className={"con-icon" + (lighttheme ? "" : " dark")}>
                              {chatName[0]}
                            </p>
                            <p className={"con-title" + (lighttheme ? "" : " dark")}>
                              {chatName}
                            </p>
          
                            <p className="con-lastMessage">
                              No previous Messages, click here to start a new chat
                            </p>
                            {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                          {conversation.timeStamp}
                        </p> */}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="conversation-container"
                          onClick={() => {
                            navigate(
                              "chat/" +
                                conversation._id +
                                "&" +
                                chatName
                            );
                            console.log("Navigating to chat:", conversation._id, chatName);
                          }}
                        >
                          <p className={"con-icon" + (lighttheme ? "" : " dark")}>
                            {chatName[0]}
                          </p>
                          <p className={"con-title" + (lighttheme ? "" : " dark")}>
                            {chatName}
                          </p>
          
                          <p className="con-lastMessage">
                            {conversation.latestMessage?.content}
                          </p>
                          {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                          {conversation.timeStamp}
                        </p> */}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          }

export default Slidebar