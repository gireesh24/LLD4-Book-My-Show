const mongooes=require("mongoose");
const userSchema= new mongooes.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false},
    role:{
        type:String,
        enum:["user","admin","partner"],
        required:true,
        default:"user"
    },
    otp:{
        type: String
    },
    otpExpary:{
        type:Date
    }
})

const UserModel= mongooes.model("NovUsers",userSchema);
module.exports=UserModel;