import { axiosInstance } from ".";

// getallmovies
export const getAllMovies= async ()=>{
    try{
        const response=await axiosInstance.get("/api/movies/get-all-movie");
        console.log("get all movies aPI", response.data)
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// add movies
export const addMovies= async (value)=>{
    try{
        const response=await axiosInstance.post("/api/movies/add-movie", value);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// update a movie

export const updatedMovie= async (payload)=>{
    try{
        const response=await axiosInstance.post("/api/movies/update-movie", payload);
        return response.data;
    }catch(err){
        console.log(err);
    }
}
// delete movie
export const deleteMovie= async (payload)=>{
    try{
        const response=await axiosInstance.delete(`/api/movies/delete-movie/${payload.movieId}`);
        // const response=await axiosInstance.delete(`/api/movies/delete-movie/`+payload.movieId);

        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const getMovieById= async(payload)=>{
try{
    const response=await axiosInstance.get(`/api/movies/movie/${payload.movie_id}`);
    // const response=await axiosInstance.delete(`/api/movies/delete-movie/`+payload.movieId);

    return response.data;
}catch(err){
        console.log(err);
    }
}