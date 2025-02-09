const express=require("express");
const path=require("path");
const cors=require("cors");

const app=express();
app.use(cors({
    origin: "*",
    methods:["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders:["Content-Type","Authorization"],
}))
const clientBuildpath= path.join(__dirname,"../client/build");
console.log(clientBuildpath);
app.use(express.static(clientBuildpath));

app.get("*", (req,res)=>{
    res.sendFile(path.join(clientBuildpath, "index.html"));
})

require("dotenv").config(); // load env varibles

const userRoutes=require("./routes/userRoutes");
const movieRoutes=require("./routes/movieRoutes");
const theatreRoutes=require("./routes/theaterRoutes")
const showRoutes=require("./routes/showRoutes");
const connectDB=require("./config/db");
console.log("server", process.env.DB_URL);
connectDB();
app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/movies", movieRoutes)
app.use("/api/theatres",theatreRoutes)
app.use("/api/shows",showRoutes);
app.listen(9092,()=>{
    console.log("9092 sever started")
})