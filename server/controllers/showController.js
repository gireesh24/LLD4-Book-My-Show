// const shows = require("../models/showModal");
const shows = require("../models/showModal");

const addShows= async (req,res)=>{
    try{
        const newShow= new shows(req.body);
        await newShow.save();
        
        res.status(200).send({
            success:true,
            message:"shows added successfully",
            data:newShow
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

//delete Shows

const deleteShows=async(req,res)=>{
    try{
        console.log(req.params.id)
        const show=await shows.findByIdAndDelete(req.params.id);
        console.log("delete shows route",show)
        if(!show){
            return res.send({
                success:true,
                message:"show deleted successfully"
            }).status(404)
        }
        res.send({
            success:true,
            message:"show deleted successfully"
        })
    }catch(err){
        console.log("delete shows route else block")
        res.send({
            success:false,
            message:err.message
        }) 
    }
}

// updateshows
const updateShows= async(req,res)=>{
    try{
const updatedShow= await shows.findByIdAndUpdate(req.body.showId, req.body, {new:true});
res.send({
    success: true,
    message:"show updated successfully",
    data:updatedShow
})
    }catch(err){
        res.send({
            success:false,
            message:err.message
        }) 
    }
}

//get all shows by theatre
const getAllShowsByTheatre=async(req,res)=>{
    try{
        // const id=req.params.id;
        console.log("get all shows by theatre id:-",req.params.id)
        const resShows= await shows.find({theatre:req.params.id}).populate("movie");
        //  const resShows= await shows.find({theatre:req.params.id});
        // console.log("shows",resShows)

        res.status(200).send({
            success:true,
            message:"all thatres shows fetched successfully",
            data:resShows
        })
    }catch(err){
        console.log("get all shows by theatre catch block")
        res.send({
            success:false,
            message:err.message
        }) 
    }
}


// getalltheatresBymovies
// const getAllTheatresByMovies=async(req,res)=>{
//     try{
//         const {movie,date}=req.params;
//         const movieShows= await shows.find({movie,date}).populate("theatre");
//         console.log("get all theatres by movie try block movie shows",movieShows, movie, date)
//         let uniquetheatres=[];
//         movieShows.forEach((show)=>{
//             let isTheatre=uniquetheatres.find(
//                 (theatre)=>theatre._id===show.theatre._id
//             )
      
//         if(!isTheatre){
//             let showOfThisTheatre=movieShows.filter(
//                 (showObj)=>showObj.theatre._id===show.theatre._id
//             );
//             uniquetheatres.push({
//                 ...show.theatre._doc,
//                 movieShows:showOfThisTheatre
//             });
//               }
//          })
//         res.status(200).send({
//             success:true,
//             message:"shows added successfully",
//             data:uniquetheatres
//         })
//     }catch(err){
//         res.send({
//             success:false,
//             message:err.message
//         }) 
//     }
// }

const getAllTheatresByMovies=async(req,res)=>{
    /**
     * cosnt uniqueMap = new Map();
     * !uniqueMap.has(theate) -> uniqueMap.set(theatre, show)
     */
    try {
      /**
       * this route handles post request to get all theatres by movie which has shows for that date
       * it expects the request body to contain movie and date
       * it retrieve all shows of the specified movie and date ( Show.find({movie date})
       * it then filters out unique theatres from the shows
       * it then sends the response back to the client with the unique theatres and their shows
       */
      const { movie, date } = req.params;
      const movieShows = await shows.find({ movie, date }).populate("theatre");
      // filter out the unique theatres
      const uniqueTheatres = [];
      movieShows.forEach((show) => {
        const isTheatre = uniqueTheatres.find(
          (theatre) => theatre.id === show.theatre.id
        );
        if (!isTheatre) {
          const showsOfThisTheatre = movieShows.filter(
            (showObj) => showObj.theatre._id == show.theatre._id
          );
          uniqueTheatres.push({
            ...show.theatre._doc,
            shows: showsOfThisTheatre,
          });
        }
      });
      res.send({
        success: true,
        data: uniqueTheatres,
        message: "Theatres fetched successfully",
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

// get shows by id
const getShowsById=async(req,res)=>{
    try{
        const showId=req.params.showId
        const showsById= await shows.findById(showId)
        .populate("movie").populate("theatre");
        console.log("get shows by ID data",showsById)
        res.status(200).send({
            success:true,
            message:"shows fetched successfully by show id",
            data:showsById
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        }) 
    }
}
// get shows in db for test
const getAllShows=async(req,res)=>{
    try{
        const shows= await shows.find();
        res.status(200).send({
            success:true,
            message:"shows fetched successfully by show id",
            data:shows
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        }) 
    }
}
module.exports={
    addShows,
    updateShows,
    deleteShows,
    getAllShowsByTheatre,
    getAllTheatresByMovies,
    getShowsById,
    getAllShows
}