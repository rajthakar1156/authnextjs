import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add a username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please add an email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please add a password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

//bcz nextjs runs on edge computing so that why we gives to option if 1st time then use useSchema otherwise use reference of it.
const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User