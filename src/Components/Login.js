import React, { useState } from 'react';
import { TextField, Button, Backdrop, CircularProgress } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import Toaster from './Toaster';
import axios from 'axios';
import "./my-style.css"
function Login() {
    
    const logo = "https://cdn-icons-png.flaticon.com/512/2936/2936956.png";
    const [showLogin, setShowLogin] = useState(true); 
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [loginStatus, setLoginStatus] = React.useState("");
    const [signInStatus, setSignInStatus] = React.useState("");
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const loginHandler = async () => {
        setLoading(true);
        console.log(data);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
                
            };
            const response = await axios.post(
                "http://localhost:8080/user/login/",
                data,
                config
            );
            console.log("Login:",response);
            setLoginStatus({msg:"Success",key:Math.random()});
            setLoading(false);
            localStorage.setItem("userData", JSON.stringify(response)); 
            navigate("/app");
        } catch (error) {
            
            setLoginStatus({
                msg: "Invalid Username or Password",
                key: Math.random(),
            });
        }
        setLoading(false);
    };

    const signUpHandler = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.post(
                "http://localhost:8080/user/register/",
                data,
                config
            );
            console.log(response);
            setSignInStatus({msg:"Success",key:Math.random()});
            navigate("/app");
            localStorage.setItem("userData", JSON.stringify(response)); 
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response.status === 405) {
                setSignInStatus({
                    msg: "User with this Email id is already Exists",
                    key: Math.random(),
                });
            }
            if (error.response.status === 406) {
                setSignInStatus({
                    msg: "User Name Already taken,Please take Another one",
                    key: Math.random(),
                });
            }
            setLoading(false);
        }
        
    };

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className='login-container'>
                <div className='img-container'>
                    <img src={logo} className='welcome-logo' alt='Live Chat Logo' />
                </div>
                {showLogin && (
                    <div className='login-box'>
                        <p className='login-text'>Login to Your Account</p>
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter Username"
                            variant="outlined"
                            color='secondary'
                            name='name'
                        />
                        <TextField
                            onChange={changeHandler}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color='secondary'
                            name='password'
                        />
                        <Button
                            variant="outlined"
                            color='secondary'
                            onClick={loginHandler}
                        >
                            Login
                        </Button>
                        <p>
                            Don't have an Account?{""}
                            <span
                                className='hyper'
                                onClick={() => {
                                    setShowLogin(false);
                                }}
                            >
                                Sign up
                            </span>
                        </p>
                        {loginStatus.msg && (
                            <Toaster key={loginStatus.key} message={loginStatus.msg} />
                            // console.log("from toaster")
                        )}
                    </div>
                )}
                {!showLogin && (
                    <div className='login-box'>
                        <p className='login-text'>Create Your Account</p>
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter Username"
                            variant="outlined"
                            color='secondary'
                            name='name'
                        />
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter Email Address"
                            variant='outlined'
                            color='secondary'
                            name='email'
                        />
                        <TextField
                            onChange={changeHandler}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color='secondary'
                            name='password'
                        />
                        <Button
                            variant="outlined"
                            color='secondary'
                            onClick={signUpHandler}
                        >
                            Sign up
                        </Button>
                        <p>
                            Already have an Account?
                            <span
                                className='hyper'
                                onClick={() => {
                                    setShowLogin(true);
                                }}
                            >
                                Login
                            </span>
                        </p>
                         {signInStatus ? (
                            <Toaster key={signInStatus.key} message={signInStatus.msg} />
                            // console.log("from toaster")
                        ) : null}
                    </div>
                )}
            </div>
        </>
    );
}

export default Login;
