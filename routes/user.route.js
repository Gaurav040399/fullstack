const express = require("express")
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { UserModel } = require("../model//user.model");


userRoute.post("/register",async(req,res)=>{
    const {email,password,location,age} = req.body
   try {
    bcrypt.hash(password, 4, async(err, hash) => {
        const user = new UserModel({email,password:hash,location,age});
        await user.save();
        res.status(200).send({"msg":"Registration Has been seccessfull"});
    });
   } catch (err) {
        res.status(400).send({"msg":err.message})
   }
})

userRoute.post("/login",async(req,res)=>{
   const {email, password} = req.body
   try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({"userID":user._id},"masai");
                    res.status(200).send({msg:"Login Seccessfull!","token":token})
                }else{
                    res.status(400).send({msg:"Wrong Credential","error":err})
                }
            })
        
    }else{
        res.status(400).send({msg:"Register Frist!"})
    }
        
    } catch (err) {
        res.status(400).send({msg:err.message})
    }
 
})

module.exports = {
    userRoute
}