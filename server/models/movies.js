const mongooes=require('mongoose');
const moviesSchema= new mongooes.Schema({
    title:{ type: String, required:true},
    description:{ type: String, required:true},
    duration:{ type: Number, required:true},
    genre:{ type: String, required:true},
    language:{ type: String, required:true},
    releasedate:{ type: Date, required:true},
    poster:{ type: String, required:true},

})

const movies=mongooes.model("NovMovies", moviesSchema);
module.exports=movies