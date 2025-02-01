import axios from "axios";
// import getCookie from "cookie-parser";
export const axiosInstance=axios.create({
    headers:{
        "Content-Type":"application/json",
        // Authorization:`Barear ${localStorage.getItem('token')}`, // reading token from local storage
        // Authorization: `Barear ${getCookie('token')}`
        baseURL:"/"
    },
    
});

axiosInstance.interceptors.request.use(
    function(config){
        const token=localStorage.getItem("token");
        if(token){
            config.headers["Authorization"]=`Barear ${token}`;

        }
        return config;
    },
    function(err){
        console.log("axios intercpetorrs failed")
        return Promise.reject(err)
    }
)

