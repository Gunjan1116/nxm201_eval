const jwt=require("jsonwebtoken");
const fs=require("fs");
require("dotenv").config()
const authenticate=async(req,res,next)=>{
    const token=req.headers.authorization;
    try {
        if(token){
            const tokenvalid=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
            if(tokenvalid.includes(token)){
                return res.send("login again!")
            }
            jwt.verify(token,process.env.normal,async(err,decode)=>{
                if(err){
                    res.send("please login first!")
                }else{
                    const role=decode.role;
                    req.body.role=role;
                    next();
                }
            })
        }else{
            res.send("login again!!")
        }
    } catch (error) {
        console.log("err","from auth middleware")
        res.send(error.message);
    }
    
}
module.exports={
    authenticate
}