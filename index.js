const express=require("express");
require("dotenv").config()
const {connection}=require("./config/db")
const {userRoute}=require("./routes/user.route")
const {goldrateRoute}=require("./routes/goldrate.route")
const {userstatsRoute}=require("./routes/userstats.route")
const {authenticate}=require("./middlewares/authenticate.middleware");
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome to home page!")
})
app.use("/user",userRoute);
app.use(authenticate);
app.use("/goldrate",goldrateRoute);
app.use("/userstats",userstatsRoute);

app.listen(process.env.port,async()=>{
    try {
       await connection;
       console.log("connected to DB") 
    } catch (error) {
        console.log(error);
        console.log("Not able to connect to DB")
    }
    console.log(`server is running at port ${process.env.port}`)
})

