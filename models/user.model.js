const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String,enum:["customer","manager"],default:"customer"}
})
const Usermodel=mongoose.model("user",userSchema);

module.exports={
    Usermodel
}