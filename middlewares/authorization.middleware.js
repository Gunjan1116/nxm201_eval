const authorize=(role_array)=>{
    return (req,res,next)=>{
        const userrole=req.body.role;
        if(role_array.includes(userrole)){
            next();
        }else{
            res.send("you are not authorized!!")
        }
    }
}

module.exports={
    authorize
}