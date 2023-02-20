import express from 'express';
const blogrouter=express.Router();
import { getAllBlogs } from "../controllers/blog-controller.js";
import { createBlog,updateb,getterf,deletef,getuserb } from "../controllers/blog-controller.js";

blogrouter.get("/",getAllBlogs);
blogrouter.post("/create",createBlog);
blogrouter.put("/update/:id",updateb);
blogrouter.get('/:id',getterf);
blogrouter.delete('/:id',deletef);
blogrouter.get('/user/:id',getuserb);

export default blogrouter;