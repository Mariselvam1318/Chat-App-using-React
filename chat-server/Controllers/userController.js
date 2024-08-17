const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const userModel = require("../modals/userModel");
const generateToken = require("../Config/generateToken");
    

const loginController = expressAsyncHandler(async (req,res)=>{
        console.log(req.body);
        const {name,password}=req.body;
        const user = await userModel.findOne({name});
        console.log("Fetched user data:",user);
        console.log(await user.matchPassword(password));
        if( user&&(await user.matchPassword(password))){
            const response ={
                _id : user.id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user._id),
            };
            console.log(response);
            res.json(response);
        }
        else{
            res.status(401)
            throw new Error("Invalid Username or Password");
        }
});
    

const registerController= expressAsyncHandler(async (req,res)=>{
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            res.send(400);
            throw Error("All input fileds must be filled");
        }
        const userExist = await userModel.findOne({email});
        if(userExist){
            throw new Error("User already Exists");
        }
        const userNameExist = await userModel.findOne({name});
        if(userNameExist){
            throw new Error("UserName already taken");
        }
         const user = await userModel.create({name,email,password});
         if(user){
            res.status(201).json({
                _id : user.id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user._id),
            })
         }
         else{
            res.status(400);
            throw new Error("Registration Error");
         }
});

const fetchAllUsersController = expressAsyncHandler(async(req,res)=>{
    const keyword = req.query.search
    ?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}},
        ],
    }
    :{};
    const users = await userModel.find(keyword).find({
        _id:{$ne:req.user._id},
    });
    res.send(users); 
})

module.exports = {loginController,registerController,fetchAllUsersController};