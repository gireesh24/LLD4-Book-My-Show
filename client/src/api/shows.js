import { axiosInstance } from ".";

export const addShows= async(values)=>{
    try{
        const response= await axiosInstance.post("/api/shows/add-shows",values);
        console.log("addshows api called successfully")
        return response.data
    }catch(err){
        console.log("add shows api failed", err.message);
    }
}

export const updateShows=async(payload)=>{
    try{
        const response= await axiosInstance.post(`/api/shows/update-shows/`,payload);
        console.log("updateshows api called successfully")
        return response.data
    }catch(err){
        console.log("update shows api failed", err.message);
    }
}
export const deleteShows= async(payload)=>{
    try{
        const response= await axiosInstance.delete(`/api/shows/delete-shows/${payload.id}`);
        console.log("delete shows api called successfully")
        return response.data
    }catch(err){
        console.log("delete shows api failed", err.message);
    }
}

export const getAllShowsByTheatre= async(payload)=>{
    try{
        const response= await axiosInstance.get(`/api/shows/get-all-shows-by-theatre/${payload.id}`);
        console.log("getAllshowsByTheatre api called successfully")
        return response.data
    }catch(err){
        console.log("getAllshowsByTheatre  api failed", err.message);
    }
}

export const getAllTheatresByMovie= async({movie, date})=>{
    try{
        const response= await axiosInstance.get(`/api/shows/get-All-theatres-by-movie/${movie}/${date}`);
        console.log("getAllShowsBymovie api called successfully")
        return response.data
    }catch(err){
        console.log("getAllShowsBymovie api failed", err.message);
    }
}


export const getAllShowsById= async(payload)=>{
    try{
        const response= await axiosInstance.get(`/api/shows/get-shows-by-id/${payload.showId}`);
        console.log("getAllShowsById api called successfully", response.data)
        return response.data
    }catch(err){
        console.log("getAllShowsById shows api failed", err.message);
    }
}
