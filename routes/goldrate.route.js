const express=require("express");

const goldrateRoute=express.Router()


goldrateRoute.get("/",(req,res)=>{
    res.send("all rates of gold are here!!")
})

module.exports={
    goldrateRoute
}