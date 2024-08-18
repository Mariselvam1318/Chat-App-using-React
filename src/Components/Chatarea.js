import React, { useState, useRef, useEffect, useContext } from 'react';
import "./my-style.css";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";
import MessageSelf from './MessageSelf';
import MessageOthers from './MessageOthers';
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { myContext } from "./MainContainer";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:8080";
var socket;

function Chatarea() {
    const [messageContent, setMessageContent] = useState("");
    const messagesEndRef = useRef(null);
    const dyParams = useParams();
    const [chat_id, chat_user] = dyParams._id.split("&");
    const localStorageData = localStorage.getItem("userData");
    if (localStorageData) {
        const userData = JSON.parse(localStorageData);
        sessionStorage.setItem("userData", JSON.stringify(userData));
    }
    const storedUserData = sessionStorage.getItem("userData");
    const userData = JSON.parse(storedUserData);
    const [allMessages, setAllMessages] = useState([]);
    const [allMessagesCopy, setAllMessagesCopy] = useState([]);
    const { refresh, setRefresh } = useContext(myContext);
    const [loaded, setLoaded] = useState(false);
    const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
    
    const sendMessage = () => {
        var data = null;
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };

        axios
            .post("http://localhost:8080/message/", {
                content: messageContent,
                chatId: chat_id,
            },
                config)
            .then(({ response }) => {
                data = response;
                console.log("Message sent successfully", data);
                setRefresh(!refresh); // Trigger refresh to fetch updated messages
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
        socket.emit("newMessage", data);
    };

    // Socket connection
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", userData);
        socket.on("connection", () => {
            setSocketConnectionStatus(!socketConnectionStatus);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    // New message received
    useEffect(() => {
        socket.on("message Received", (newMessage) => {
            if (!allMessagesCopy || allMessagesCopy._id !== newMessage._id) {
                setAllMessages([...allMessages, newMessage]);
            } else {
                setAllMessages([...allMessages, newMessage]);
            }
        });
    }, [allMessages, allMessagesCopy]);


   
    

    // Fetch chats
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };

        axios
            .get(`http://localhost:8080/message/${chat_id}`, config)
            .then(({ data }) => {
               // console.log("API Response:", data); // Log the API response here
                setAllMessages(data);
                setLoaded(true);
                socket.emit("join chat", chat_id);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
        setAllMessagesCopy(allMessages);
    }, [refresh, chat_id, userData.data.token, allMessages]);
    // useEffect(() => {
    //    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [allMessages]);
    if (!loaded) {
        return (
            <div
                style={{
                    border: "20px",
                    padding: "10px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", borderRadius: "10px" }}
                    height={60}
                />
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: "100%",
                        borderRadius: "10px",
                        flexGrow: "1",
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", borderRadius: "10px" }}
                    height={60}
                />
            </div>
        );
    } else {
        return (
            <div className='chatarea-container'>
                <div className='chatarea-header'>
                    <p className='con-icon'>{chat_user[0]}</p>
                    <div className='header-text'>
                        <p className='con-title'>{chat_user}</p>
                    </div>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div className='message-container'>
                    {allMessages.map((message, index) => {
                        const sender = message.sender;
                        const self_id = userData.data._id;
                        return (
                            <React.Fragment key={index}>
                                {sender && sender._id === self_id ? (
                                    <MessageSelf props={message} />
                                ) : (
                                    <MessageOthers props={message} />
                                )}
                            </React.Fragment>
                        );
                    })}
                    <div ref={messagesEndRef} /> {/* Ensure this is at the end */}
                </div>
                <div className='text-input'>
                    <input
                        placeholder="Type a Message"
                        className="search-box"
                        value={messageContent}
                        onChange={(e) => {
                            setMessageContent(e.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.code === "Enter") {
                                sendMessage();
                                setMessageContent("");
                            }
                        }}
                    />
                    <IconButton
                        className="icon"
                        onClick={() => {
                            sendMessage();
                            setMessageContent("");
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default Chatarea;


