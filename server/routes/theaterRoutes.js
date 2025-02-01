const theatreRoute=require("express").Router();
const Theatre=require("../models/theatermodel");

//add theater
theatreRoute.post("/add-theatres", async (req,res)=>{
    try{
const newtheatre= new Theatre(req.body);
await newtheatre.save();
res.send({
    success:true,
    message:"theatre saved successfully",
    data:newtheatre
})
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
})

//update theatre

theatreRoute.post("/update-theatres", async (req,res)=>{
    try{
    const theatreUpadated= await Theatre.findByIdAndUpdate(req.body._id, req.body, {new:true})
        res.send({
        success:true,
        message:"theatre saved successfully",
        data:theatreUpadated
        })
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
})

// delete a theatre id
theatreRoute.delete("/delete-theatres/:theatreId", async (req,res)=>{
    try{
const theatreDeleted= await Theatre.findByIdAndDelete(req.params.theatreId)
if(!theatreDeleted){
    return res.status(404).send({
        success:false,
        message:"theatre not found"
    })
}
res.send({
    success:true,
    message:"theatre deleted successfully",

})
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
})

//get all theatre for a admin

theatreRoute.get("/get-all-theatres", async (req,res)=>{
    try{
const allTheatre= await Theatre.find().populate("owner")
res.send({
    success:true,
    message:"theatre saved successfully",
    data:allTheatre
})
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
})

// get a theatre from specfic owner
theatreRoute.get("/get-all-theatres-by-owner/:ownerId", async (req,res)=>{
    try{
const allTheatre= await Theatre.find({owner:req.params.ownerId})
res.send({
    success:true,
    message:"theatre saved successfully",
    data:allTheatre
})
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
})

module.exports=theatreRoute;