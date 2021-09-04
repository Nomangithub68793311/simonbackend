const express=require('express');
const router=express.Router();
const User=require('../models/User')
const auth=require('./routehandler')


router.post('/signup',auth.signup_post);



module.exports=router;
