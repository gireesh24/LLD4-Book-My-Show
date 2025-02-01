import React from 'react'
import { Col,Modal,Row,Form,Input,Button,Select,Table,message } from 'antd'
import { ShowLoading,HideLoading } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { ArrowLeftOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { useEffect,useState } from 'react';
import { getAllMovies } from '../../api/movies'
import { addShows,
        updateShows,
        deleteShows,
        getAllShowsByTheatre
 } from '../../api/shows'   
import moment from 'moment'

const ShowModal=({
    isShowModalOpen,
    setIsShowModalOpen,
    selectedTheatre
})=> {
    const[view, setView]=useState("table");
    const[movies, setMovies]= useState([]);
    const [selectedMovie, setSelectedMovie]=useState(null);
    const [shows, setShows]= useState([]);
    const [selectedShow, setSelectedShow]=useState(null);
    const dispatch=useDispatch();
    
    const getData= async()=>{
        try{
            // dispatch(ShowLoading());
            const movieResponse= await getAllMovies();
            console.log("movie response in get data", movieResponse.success)
            if(movieResponse.success){
                setMovies(movieResponse.data);
            }
            else{
                message.error(movieResponse.message);
                console.log("getData failed else block movieresponse", movieResponse.message);
            }

            const showResponse=await getAllShowsByTheatre({
                id:selectedTheatre._id
            });
            if(showResponse.success){
                // setShows(showResponse.data)
                // to render a table list of child process every row has a unique identification is required
                setShows(showResponse.data.map(show=>({...show, key: show._id})))
            }else{
                message.error(showResponse.message);
                console.log("getData failed else block showresponse", showResponse.message);
            }
            // dispatch(HideLoading());
        }catch(err){
            message.error(err.message)
            console.log("getData failed", err.message);
            //  dispatch(HideLoading());
        }
        // finally{
        //     dispatch(HideLoading());
        // }
    }

    const onFinish=async(values)=>{
        try{
            dispatch(ShowLoading());
            let response=null;
            if(view==='add'){
                response=await addShows({...values, theatre:selectedTheatre._id});
            }else{
                response=await updateShows({
                    ...values,
                     showId:selectedShow._id,
                     theatre:selectedTheatre._id,
                    })
            }
            if(response.success){
                getData();
                message.success(response.message);
                setView("table");
            }
            else{
                message.error(response.message)
                console.log("onfinish failed to get response", response.message);
            }
            dispatch(HideLoading());
           
        }catch(err){
            message.error(err.message)
            console.log("onfinsh failed", err.message);
            dispatch(HideLoading());
        }
    }

        const handleCancel=()=>{
            setIsShowModalOpen(false)
        }

        const handleDelete=async(showId)=>{
            try{
                dispatch(ShowLoading());
                console.log("delete show component", showId)
                const response=await deleteShows({id:showId});
                console.log("response of delet show route", response)
                if(response.success){
                    message.success(response.message);
                    getData();
                }
                else{
                    message.error(response.message);
                    console.log("handleDelete failed in else block", response.message);
                }
                dispatch(HideLoading());
            }catch(err){
                message.error(err.message)
                console.log("handleDelete failed", err.message);
                dispatch(HideLoading());
            }
        };

        const colums=[
            {
                title:"Show name",
                dataIndex:"name",
                key:"name"
            },
            {
                title:"Show Date",
                dataIndex:"date",
                key:"date",
                render:(text,data)=>{
                    return moment(text).format("MMM Do YYYY")
                },
            },
            {
                title:"Show time",
                dataIndex:"time",
                key:"time",
                render:(text,data)=>{
                    return moment(text, "HH:mm").format("hh:mm A")
                }
            },
            {
                title:"Movie",
                dataIndex:"movie",
                key:"movie",
                render:(text,data)=>{
                    console.log("show modal colums:--",data)
                    return <strong> {data.movie?.title || 'movie not found'}</strong>;
                }
            },
            
            {
                title:"Ticket price",
                dataIndex:"ticketPrice",
                key:"ticketPrice"
            },
            {
                title:"Total Seats",
                dataIndex:"totalSeats",
                key:"totalSeats"
            },
            {
                title:"Available Seats",
                dataIndex:"seats",
                key:"seats",
                render:(text,data)=>{
                   return data.totalSeats-data.bookedSeats.length;
                }
            },
            {
                title:"Action",
                dataIndex:"action",
                key:"action",
                render:(text,data)=>{
                    return(
                        <div className='d-flex, align-items-centre  gap-10'>
                            <Button
                            onClick={()=>{
                                setView("edit");
                                setSelectedMovie(data.movie);
                                setSelectedShow({
                                    ...data, date:moment(data.date).format("YYYY-MM-DD")
                                });
                                console.log("showmodal current movie, show details",selectedMovie,selectedShow);
                            }}
                            >
                                <EditOutlined />
                            </Button>
                            <Button 
                                onClick={()=>{
                                    handleDelete(data._id)
                                }}
                            >
                                <DeleteOutlined />
                            </Button>
                                {data.isActive &&(
                                    <Button onClick={()=>{
                                        setIsShowModalOpen(true)
                                    }} >
                                        +Shows
                                    </Button>
                                )}
                        </div>
                    )
                }
            }
        ];
        useEffect(()=>{
            getData();
        },[])
  return (
    <Modal
        centered
        title={selectedTheatre.name}
        open={isShowModalOpen}
        onCancel={handleCancel}
        width={1200}
        footer={null}
    >
        <div className='d-flex justify-content-between'>
            <h3>
                {view==="table" 
                ?"list of Shows"
                : view==="add" 
                ? "Add Show"
                : "Edit Show"}
            </h3>
            {view==="table" &&(
                <Button type='primary' onClick={()=>{
                    setView("add")
                    
                }}>
                    Add Show
                </Button>
            )}
        </div>
        {view==="table" && <Table dataSource={shows} columns={colums}/>}
            
        {(view==="add" || view==="edit") && (
            <Form 
                className=''
                layout='vertical'
                style={{width:"100%"}}
                initialValues={view==="edit"? selectedShow:null}
                onFinish={onFinish}
            >
            <Row
                gutter={{
                    xs:6,
                    sm:10,
                    md:12,
                    lg:16
                }}
            >
                <Col span={24}>
                <Row
                    gutter={{
                    xs:6,
                    sm:10,
                    md:12,
                    lg:16 
                    }}
                >
                    <Col span={8}>
                    <Form.Item
                        label="Show Name"
                        htmlFor='name'
                        name="name"
                        className='d-block'
                        rules={[{required:true, message:"show name mandatory"}]}
                    >
                        <Input
                        id='name'
                        type='text'
                        placeholder='Show name' 
                        ></Input>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                        label="Show Date"
                        htmlFor='date'
                        name="date"
                        className='d-block'
                        rules={[{required:true, message:"show date mandatory"}]}
                    >
                        <Input
                            id='date'
                            type='date'
                            placeholder='select show date'
                        ></Input>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label="Show Timing"
                    htmlFor='time'
                    name='time'
                    className='d-block'
                    rules={[{required:true,message:"show time mandatory"}]}
                    >
                    <Input
                        id='time'
                        type='time'
                        placeholder='Show time'
                    ></Input>
                    </Form.Item>
                    </Col>
                </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={{
                         xs:6,
                         sm:10,
                         md:12,
                         lg:16
                    }}>
                <Col span={8}>
                <Form.Item 
                    label="select the movie"
                    htmlFor='movie'
                    name='movie'
                    className='d-block'
                    rules={[{required:true, message:"movie required"}]}
                >
                    <Select
                        id='movie'
                        placeholder="select movie"
                        defaultValue={selectedMovie && selectedMovie.title}
                        style={{width:"100%", height:"45px"}}
                        options={movies.map((movie)=>({
                            key:movie._id,
                            value: movie._id,
                            label:movie.title,
                        }))}
                    />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                    label="Ticket Price"
                    htmlFor='ticketPrice'
                    name="ticketPrice"
                    className='d-block'
                    rules={[{required:true, message:"ticket price required"}]}
                >
                <Input
                    id='ticketPrice'
                    type='number'
                    placeholder='enter the ticket price'
                ></Input>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                    label='Total Seats'
                    htmlFor='totalSeats'
                    name='totalSeats'
                    className='d-block'
                    rules={[{required:true, message:"totalPrice required"}]}
                >
                <Input
                    id='totalSeats'
                    type='number'
                    placeholder='enter totalSeats'
                ></Input>
                </Form.Item>
                </Col>
                </Row>
                </Col>
            </Row>
            <div className='d-flex gap-10'>
                <Button
                className=''
                block
                onClick={()=>{
                    setView("table")
                }}
                htmlType='button'
                ><ArrowLeftOutlined/>Go Back</Button>
                <Button
                block
                type='primary'
                htmlType='submit'
                style={{fontSize:'1rem', fontWeight:"600"}}
                >
                    {view==='add'?"Add the Show":"Edit the Show"}
                </Button>
            </div>
            </Form>
        )}
    </Modal>
);
};

export default ShowModal