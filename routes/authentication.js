const express=require('express');
const { json } = require('body-parser');
const User = require('../model/Register');

const router=express.Router();

router.post('/register',(req,res)=>{
    res.render("index");
})

router.post('/valid',async(req,res)=>{
   const errors=[];
   const{name,email,password}=req.body;
   
   
   const existingUser=await User.findOne({name});
   if(existingUser){
    errors.push({name:"User name is already exits"})
   }
   const existingEmail=await User.findOne({email});
   if(existingEmail){
    errors.push({email:"Email is already taken"})
   }
 
  if(errors.length===0){
    // console.log(errors.length);
     const newUser=new User(
      {
        name:name,
        email:email,
        password:password
      }
     );
     await newUser.save();
      
     res.json({success:true});
  }
  else{
    res.status(400).json({success:false,errors})
  }
   

})

module.exports=router;