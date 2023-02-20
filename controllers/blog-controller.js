import mongoose from "mongoose";
import  Blog  from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs=async(req,res,next)=>{
    let blogs;
    try{
      blogs= await Blog.find();
    }catch(e){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"blog not found"});
    }
    return res.status(200).json({blogs});
}


export const createBlog=async(req,res,next)=>{
    const { title,content,contact,user }=req.body;
    let existUser;
    try{
        existUser=await User.findById(user);
    }catch(e){
        return console.log(e);
    }
    if(!existUser){
        return res.status(404).json({message:'user not found'});
    }
    
    const blog=new Blog({
        title,content,contact,user
    });
    try{
      const session= await mongoose.startSession();
      session.startTransaction();
       await blog.save({ session });
       existUser.blogs.push(blog);
       await existUser.save({ session });
       await session.commitTransaction();
    }catch(e){
        return console.log(e);
    }
    return res.status(200).json({message:"blog added successfully"});
}


export const updateb=async(req,res,next)=>{
    const { title,content,contact}=req.body;
    const blogId=req.params.id;
    let blog;
    try{

        blog=await  Blog.findByIdAndUpdate(blogId,{
            title,content,contact
           })
           

    }catch(e){
        return console.log(e);
       }
       if(!blog){
        return res.status(404).json({message:"not present"});
       }
       return res.status(200).json({blog});
  
}
export const getterf=async(req,res,next)=>{
    const blogId=req.params.id;
    let blog;
    try{
        blog =await Blog.findById(blogId);

    }catch(e){
        return res.status(404).json({message:"not found"});
    }
    return res.status(200).json({blog});
}


// its not working or removing from user data
export const deletef=async(req,res,next)=>{
    const blogId=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndRemove(blogId).populate('users');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(e){
      console.log(e);
  }
  if(!blog){
       return  res.status(404).json({message:"blog not found"});
  }
  return res.status(200).json({message:"deleted successfully"});

}


export const getuserb=async(req,res,next)=>{
    const uid=req.params.id;
    let userb;
    try{
        userb=await User.findById(uid).populate("blogs");
 }
 catch(e){
    console.log(e);
 }
 if(!userb){
    return  res.status(404).json({message:"blog not found"});
 }
 return res.status(200).json({blogs:userb});

}