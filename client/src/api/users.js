import { axiosInstance } from "./";

//register a nuew user

export const RegisterUser= async (value)=>{
    try{
        const response=await axiosInstance.post("/api/users/register", value);
        console.log('registered user axios instance called')
        return response.data;
    }catch(err){
        console.log('registered user axios instance failed')
        console.log(err);
    }
}

export const LoginUser= async (value)=>{
    try{
const response= await axiosInstance.post("/api/users/login", value);
return response.data
    }
    catch(err){
        console.log(err);
    }
}

export const GetCurrentUser=async()=>{
    try{
const response=await axiosInstance.get("/api/users/get-current-user");
return response.data
    }
    catch(err){
        console.log(err);
    }
}

export const forgotPassword= async(value)=>{
    try{
        const response= await axiosInstance.patch("/api/users/forgotpassword", value)
        return response.data;
    }catch(err){
        console(err);
    }
}

export const resetpassword=async(value, id)=>{
    try{
        console.log('axios instance rest passowrd route try block')
        const response= await axiosInstance.patch(`/api/users/resetpassword/${id}`, value)
        return response.data;
    }catch(err){
        console.log('axios instance rest passowrd catch try block')
        console(err);
        
    }
}