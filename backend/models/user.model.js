import mongoose from "mongoose";
const userSchema = new mongoose.Schema( {
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        required:true
    }
},{timestamp:(true)});
export const User = mongoose.model("User", userSchema);