const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const fs=require("fs");
require("dotenv").config()
const {Usermodel}=require("../models/user.model");

const userRoute=express.Router();
///signup, /login, /logout, /goldrate, /userstats.
//signup
userRoute.post("/signup",async(req,res)=>{
    const {name,email,password,role}=req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log("error",err);
                res.send("something went wrong!")
            }else{
                const payload=new Usermodel({name,email,password:hash,role});
                await payload.save();
                res.send("user register successfully!")
            }
        })
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
})

//login
userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const reqData=await Usermodel.find({email});
        if(reqData.length>0){
            bcrypt.compare(password,reqData[0].password,(err,result)=>{
                if(result){
                    const normal_token=jwt.sign({role:reqData[0].role},process.env.normal,{expiresIn:60})
                    const refresh_token=jwt.sign({role:reqData[0].role},process.env.refresh,{expiresIn:300})
                    res.send({"msg":"login successfull!",token:normal_token,refresh_token:refresh_token});
                }else{
                    res.send("wrong credentials!")
                }
            })
        }else{
            res.send("wrong credentials!!")
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
})

//logout
userRoute.get("/logout",async(req,res)=>{
    const token=req.headers.authorization;

    try {
        const blacklistToken=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
        blacklistToken.push(token);
        fs.writeFileSync("./blacklist.json",JSON.stringify(blacklistToken));
        res.send("logged out successfull !!")
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
})

//get newtoken
userRoute.get("/newtoken",async(req,res)=>{
    const refresh_token=req.headers.authorization;
    try {
        if(!refresh_token){
            res.send("login first!!!")
        }else{
            jwt.verify(refresh_token,process.env.refresh,async(err,decode)=>{
                if(err){
                    res.send("please login again!")
                }else{
                    const normal_token=jwt.sign({role:reqData[0].role},process.env.normal,{expiresIn:60});
                    res.send({"newtoken":normal_token})
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
})
module.exports={
    userRoute
}


