const movies=require("../models/movies");
// add movie
const addMovie=  async (req,res)=>{
    try{
        const newmovies= new movies(req.body);
        await newmovies.save();
        res.status(200).send({
            success:true,
            message:"movie addedd successfully"
        })
    }catch(err){
        console.log("add movie routes failed in server side",err)
        res.send({
            success:false,
            message:err.message
        });
    }
}
// get movies
const getAllMovies= async(req,res)=>{
    try{
        const allmovies= await movies.find();
        // if(!allmovies.length){
        //     return res.status(400).send("there is no record found in DB")
        // }
        res.send({
            success:true,
            message:"movies fecthed",
            data:allmovies
        });
    }catch(err){
        console.log("get all movies routes failed in server side",err)
        res.send({
            success:false,
            message:err.message
        }); 
    }
}

// update a movies
const updateMovie=async (req,res)=>{
    try{
    const updatedMovie= await movies.findByIdAndUpdate(req.body.movie_id, req.body, {new:true});
    if(!updatedMovie){
        res.status(404).send({
            success:false,
            message:"movie not found"
        })
    }
    console.log("update movie route in server side", updatedMovie)
        res.status(200).send({
            success:true,
            message:"movie addedd successfully",
            data:updatedMovie

        })
    }
    catch(err){
        console.log("update movies routes failed in server side",err)
        res.send({
            success:false,
            message:err.message
        });  
    }
}

// delete a movie

const deleteMovie=async (req,res)=>{
    try{
    const deletedMovie= await movies.findByIdAndDelete(req.params.movie_id);
    console.log(deleteMovie,req.params.movie_id)
    if(!deletedMovie){
        res.status(404).send({
            success:false,
            message:"movie not found"
        })
    }
    console.log("update movie route in server side", deletedMovie)
        res.status(200).send({
            success:true,
            message:"movie addedd successfully"
        })
    }
    catch(err){
        console.log("delete movies routes failed in server side",err)
        res.send({
            success:false,
            message:err.message
        });  
    }
}

const getMovieById= async(req,res)=>{
    try{
            const movie=await movies.findById(req.params.movie_id)
            if(!movie){
                return res.status(404).send({
                    success:false,
                    message:"movie not found in db"
                });
            }
            res.send({
                success:true,
                message:"movie fetched successfully",
                data:movie
            })
    }
    catch(err){
        console.log("get movie by id routes failed in server side",err)
        res.send({
            success:false,
            message:err.message
        });  
    }
}

    // const getMovieById = async (req, res) => {
    //     const movie = await movies.findById(req.params.movie_id);
      
    //     if (!movie) {
    //       return res.status(404).send({
    //         success: false,
    //         message: "Movie not found in DB",
    //       });
    //     }
      
    //     res.send({
    //       success: true,
    //       message: "Movie fetched successfully",
    //       data: movie,
    //     });
    //   };


module.exports={
    addMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
    getMovieById
}