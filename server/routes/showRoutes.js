const router=require("express").Router();
 const {
   addShows,
   updateShows,
   deleteShows,
   getAllShowsByTheatre,
   getAllTheatresByMovies,
   getShowsById,
   getAllShows
 }=require("../controllers/showController")
// add shows
router.post("/add-shows",addShows);
//update shows
router.post("/update-shows",updateShows);
//delete shows
router.delete("/delete-shows/:id",deleteShows);
//getallshows theatre
router.get("/get-all-shows-by-theatre/:id",getAllShowsByTheatre);
// get shows by movie
router.get("/get-all-theatres-by-movie/:movie/:date", getAllTheatresByMovies);
// get shows by id
router.get("/get-shows-by-id/:showId", getShowsById);
// get all shows for test in api
router.get("/get-all-shows", getAllShows);

module.exports=router;