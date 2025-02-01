import { axiosInstance } from "./";
export const addTheatre= async(payload)=>{
    try{
        const response= await axiosInstance.post("/api/theatres/add-theatres",payload);
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const getAllTheatresFromAdmin= async(payload)=>{
    try{
        const response= await axiosInstance.get("/api/theatres/get-all-theatres",payload);
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const getAllTheatres= async(ownerId)=>{
    try{
        const response= await axiosInstance.get(`/api/theatres/get-all-theatres-by-owner/${ownerId}`);
        return response.data
    }catch(err){
        console.log("getall thetares API call catch block",err)
    }
}

export const updateTheatre= async(payload)=>{
    try{
        const response= await axiosInstance.post("/api/theatres/update-theatres",payload);
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const deleteTheatre= async(payload)=>{
    try{
        console.log("delete theatre API payload", payload)
        const response= await axiosInstance.delete(`/api/theatres/delete-theatres/${payload.theatreId}`);
        return response.data
    }catch(err){
        console.log(err)
    }
}