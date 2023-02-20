// const express=require('express');
import express from 'express';
import { getAllUser } from '../controllers/user-controller.js';
//const  = require('../controllers/user-controller');
import { signup } from '../controllers/user-controller.js';
import { login } from '../controllers/user-controller.js';

const router=express.Router();

router.get("/",getAllUser);
router.post("/signup",signup);
router.post("/login",login);
export default router;

