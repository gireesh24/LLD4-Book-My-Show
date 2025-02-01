import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading,ShowLoading } from "../../redux/loaderSlice";
// import { getShowsById } from "../../../../server/controllers/showController";
import { useNavigate,useParams } from "react-router-dom";
import { message, Card, Row,Col,Button } from "antd";
import moment from "moment";
import { getAllShowsById } from "../../api/shows";

const BookShow =()=>{
const {user}= useSelector((state)=>state.users);
const dispatch=useDispatch();
const [show, SetShow]=useState();
const [selectedSeates, setSelectedSeats]=useState([]);
const params=useParams();
const navigate=useNavigate();

const getData=async()=>{
    try{
        dispatch(ShowLoading());
        // const response= await getShowsById({showId:params.id});
        const response= await getAllShowsById({showId:params.show_id})
        if(response){
            SetShow(response.data);
            // console.log("get data tryblock Show data", response.data,params.show_id )
        }else{
            message.error(response.message);
        }
        dispatch(HideLoading());
    }catch(err){
        console.log("Book Show getData catch block");
        message.error(err.message);
        dispatch(HideLoading());
    }
}
const getSeats=()=>{
    let colums=12;
    // let totalSeats=120;
    let totalSeats=show.totalSeats;
    // console.log("theatre seats",show.totalSeats)
    let rows=Math.floor(totalSeats/colums);
    return (
        <div className="d-flex flex-colum align-items-centre">
            <div className="w-100 max-width-600 mx-auto mb-25px">
                <p className="text-center mb-10px">
                    Screen this side, you will be watching in this direction
                </p>
                <div className="screen-div">
                    {/* place holder to screen display  */}
                </div>
            </div>
            <ul className="seat-ul justify-content-center"
                style={{marginLeft:"25px"}}
            >
                {
                    Array.from(Array(rows).keys()).map((row)=>
                      Array.from(Array(colums).keys()).map((column)=>{
                        let seatNumber= row*colums+column+1;
                        let seatClass="seat-btn";
                        if(selectedSeates.includes(seatNumber)){
                            seatClass+=" selected"; // adding selected class if seat seletced
                        }
                        if(show.bookedSeats.includes(seatNumber)){
                            seatClass+=" booked";
                        }
                        if(seatNumber<=totalSeats){
                            // rendering seat button if seat number is valid
                            return (
                                <li key={seatNumber}>
                                    {/* key add for react list rendering optimization */}
                                    <button
                                        className={seatClass}
                                        onClick={()=>{
                                            // function to handle seat selection and deselection
                                            if(selectedSeates.includes(seatNumber)){
                                                setSelectedSeats(selectedSeates.filter(
                                                    (curSeatNumber)=> curSeatNumber !== seatNumber
                                                ));
                                            }else{
                                                setSelectedSeats([...selectedSeates,seatNumber])
                                            }
                                        }}
                                    >
                                        {seatNumber}
                                    </button>
                                </li>
                            )
                        }
                    })
                    )}
            </ul>
            <div className="d-flex button-card justify-content-between w-100 max-width-600">
                <div className="flex-1">
                    selected Seats: <span>{selectedSeates.join(", ")}</span>
                </div>
                <div className="flex-shrink-0 ms-3">
                    Total Seats: <span>Rs.{selectedSeates.length * show.ticketPrice}</span>
                </div>
            </div>
        </div>
    );
}

useEffect(()=>{
    getData();
},[])

return (
    <>
    <h1> booked seats layout</h1>
    {show && (
        <Row gutter={24}>
            <Col span={24}>
            <Card title={
                <div className="movie-title-details">
                    <h1>{show.movie.title}</h1>
                    <p>
                        Theatre:{show.theatre.name}, {show.theatre.address}
                    </p>
                </div>
            }
            extra={
                <div className="show-name py-3">
                    <h3>
                    <span> Date & time:  </span>     
                    {moment(show.date).format("MMM Do YYYY")} at {" "} 
                    {moment(show.time, "HH:mm").format("hh:mm A")}                  
                    </h3>
                    <h3>
                        <span>Total Seats: </span> {show.totalSeats}
                        <span>Booked Seats:</span> {show.bookedSeats}
                        {<span> &nbsp;|&nbsp; Available seats:</span>} {" "}
                        {show.totalSeats-show.bookedSeats.length}
                    </h3>
                </div>
            }
            style={{width:"100%"}}
            >
                {getSeats()} {/*rendering dynamic seats layout */} 
               

            </Card>
            </Col>
        </Row>
    )}
    </>
)
}

export default BookShow