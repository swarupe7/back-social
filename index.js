//import  "./routes/user-route";
//const {router}=require("../routes/user-route")
import express from 'express';
import mongoose from "mongoose";
import router from './routes/user-route.js';
import blogrouter from './routes/blog-route.js';

// const express=require('express');
// const mongoose=require('mongoose');
const app=express();

app.use(express.json());


app.use('/users/',router);
app.use('/blogs/',blogrouter);





mongoose.connect('mongodb+srv://beginner:beginner@cluster0.6degedi.mongodb.net/social-media?retryWrites=true&w=majority').then(()=>console.log('db connected')).catch(()=>console.log('not connected'));
app.use("/api",(req,res,next)=>{
    res.send("hi");
})
app.get('/',(req,res)=>{
    res.end('hi bro!');
})
app.listen(3025,(req,res)=>{
    console.log('server running ');
})