import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const getAllUser=async(req,res,next)=>{
    let users;
    try{
       users=await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No user!!"});
    }
    return res.status(200).json({users});

}

export const signup=async(req,res,next)=>{
    const { name , email ,password }=req.body;
    let existingUser;
    try{
         existingUser=await User.findOne({email});
    }catch(err){
         console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"already exist"});
    }
    const hashedPassword=bcrypt.hashSync(password);
    const user=new User({
        name,email,password:hashedPassword,blogs:[]
    });
    try{
        user.save();
    }
    catch(err){
        console.log(err);
    }
    return res.status(201).json({message:"user created!"});
}


// login functionality 

export const login=async (req,res,next)=>{
    const { email, password }=req.body;
    let existingUser;
    try{
         existingUser=await User.findOne({email});
    }catch(err){
         console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message:"not exist"});
    }
    const isPassword=bcrypt.compareSync(password,existingUser.password);
    if(!isPassword){
        return res.status(404).json({message:"wrong password"});
    }
    return res.status(200).json({message:`hi welcome ${existingUser.name}`});

}

