const users=require("../models/userModel")

 const login= async (req,res)=>{
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
}

module.exports={
    login
}