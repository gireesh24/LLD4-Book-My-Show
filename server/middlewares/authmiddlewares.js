const jwt=require('jsonwebtoken');
const auth=(req,res,next)=>{
    try  {
        console.log("auth middleware called in try block")
        const token=req.headers.authorization.split(" ")[1];
        const verifiedToken=jwt.verify(token, process.env.JST_SECRET);
        console.log("verified token", verifiedToken)
        req.body.user=verifiedToken.userId;
        console.log("auth middleware user",verifiedToken.userId)
        next();
    }catch(err){
        console.log("auth middleware called in catch block")
        // localStorage.removeItem("token");
return res
.status(401)
.send({success:false, message:"unauthorized user"})
    }
}

module.exports=auth;