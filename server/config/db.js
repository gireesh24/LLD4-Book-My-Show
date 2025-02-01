const mongooes=require("mongoose")
const dbUrl=process.env.DB_URL;

const ConnectDb= async()=>{
    try{
        await mongooes.connect(dbUrl);
        console.log("connected Db")
    }
    catch(err){
        console.log(err)
    }
}
module.exports =ConnectDb;