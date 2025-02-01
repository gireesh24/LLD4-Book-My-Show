// import { JsonWebTokenError } from "jsonwebtoken";
const jwt=require("jsonwebtoken") 
const express= require("express")
// const app=express();
const cookie=require("cookie-parser")
const users=require("../models/userModel");
// const { now } = require("mongoose");
const authMiddleware=require("../middlewares/authmiddlewares");
const EmailHelper = require("../utils/emailHelper");
const userRouter=express.Router();


userRouter.post("/register", async (req,res)=>{
    try{
        const userExits= await users.findOne({email:req.body.email})
        if(userExits){
            return res.send({
                success:false,
                message:"user alredy exists"
            })
        }
         const newUser= new users(req.body);
         await newUser.save();
         res.send({
            success:true,
            message:"registartion sucessfull please login and continue",
            // data:newUser
         })
    }
    catch(err){
        console.log("server side regisration failed")
        return res.status(500).send(err)

    }
})

// userRouter.post("/register", async (req, res) => {
//     try {
//       const userExists = await users.findOne({ email: req.body.email });
//       if (userExists) {
//         return res.send({
//           success: false,
//           message: "User already exists",
//         });
//       }
//       const newUser = new users(req.body);
//       await newUser.save();
//       res.send({
//         success: true,
//         message: "Registration Successfull. Please login to continue",
//       });
//     } catch (error) {
//       return res.status(500).send(error.message);
//     }
//   });

userRouter.post("/login", async (req,res)=>{
    try{
        const userExits= await users.findOne({email:req.body.email})
if(!userExits){
    return res.send({
        success:false,
        message:"user doesnot exits"
    })
}
if(req.body.password!==userExits.password){
    return res.send({
        success:false,
        message:"password doesntmacth"
    })
}
const token =jwt.sign({userId: userExits._id},
    process.env.JST_SECRET,
    {expiresIn:"1d"})

console.log("JWT Token",token)
// res.cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
res.send({
    success:true,
    message:"login sucessfully",
    data:token
})
    }
    catch(err){
return res.status(500).send(err)
    }
})

userRouter.get("/get-current-user", authMiddleware, async (req,res)=>{
    try{
    const user=await users.findById(req.body.user).select("-password");
    console.log("get current user route form serverside try block")
     res.send({
        success:true,
        data:user,
        message:"your are authenticated"
     })
    }catch(err){
        res.status(404).send("get current user api failed in server side")
    }

})

userRouter.get("/allusers", async (req,res)=>{
    try{
        const allusers=await users.find()
        res.status(200).
        json({
            data:allusers,
            message:"hello"
        })
    }
    catch(err){
        console.log("get all users router failes")
        res.send(500).json({
            message:"get all users route failed"
        })
    }
})

userRouter.patch("/forgotpassword", async(req,res)=>{
    const otpGenrater= function(){
        return Math.floor(100000+Math.random()*900000)
    }
    try{
        if(req.body.email== undefined){
           return  res.status(401).send({
                success:false,
                message:"email required"
             })
        }
        let user=await users.findOne({email:req.body.email})
        if(user===null){
            return res.status(404).send({
                success:false,
                message:"user not found"
             })
        }
        const otp=otpGenrater();
        // console.log("otp generater",otp)
        const expary=Date.now()+10*60*1000;
        user.otp=otp;
        user.otpExpary=expary;
        await user.save();
        await EmailHelper("otp.html",user.email,{
        name:user.email,
        otp:user.otp
            });


            // console.log("forgot password route",user.email,user.otp)
            res.status(200).send({
            success:true,
            message:"otp send successfully"
         })

}catch(err){
        // console.log("fogot password route catch block",err)
        res.status(500).json({
            message:err.message       
        })
    }
})


userRouter.patch("/resetpassword/:email", async(req,res)=>{
    try{
        let resetDetails=req.body;
        if(!resetDetails.password || !resetDetails.otp){
            return res.status(401).json({
                status:"failure",
                message:"invalid request"
            })
        }
        const user=await users.findOne({email:req.params.email});
        if(user==null){
            return res.status(401).json({
                status:"failure",
                message:"user not found"
            })
        }
        if(Date.now()>user.otpExpary){
            return res.status(401).json({
                status:"failure",
                message:"otp experied"
            })
        }
        user.password=resetDetails.password;
        user.otp=undefined;
        user.otpExpary=undefined;
        await user.save();

        res.status(200).json({
            status:"success",
            message:"password reseted successfully"
        })
    }catch(err){
        console.log("reset password route catch block")
        res.status(500).json({
            message:err.message,          
        })
    }
})
module.exports=userRouter