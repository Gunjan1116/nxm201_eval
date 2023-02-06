const express=require("express");
const {authorize}=require("../middlewares/authorization.middleware")
const userstatsRoute=express.Router()


userstatsRoute.get("/",authorize(["manager"]),(req,res)=>{
    res.send("all user stats are here!!")
})

module.exports={
    userstatsRoute
}