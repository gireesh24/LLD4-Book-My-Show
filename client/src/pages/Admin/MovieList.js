import { Table, Button} from 'antd';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import React, {useEffect, useState } from 'react';
import MovieForm from './movieForm';
import DeleteMovieModal from './deleteMovieModal';
import { ShowLoading,HideLoading } from '../../redux/loaderSlice';
import { SetUser } from '../../redux/userSlice';
import { getAllMovies } from '../../api/movies';
import { GetCurrentUser } from '../../api/users';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"

function MovieList() {
     const FakeMovies=[
        {
            key:"1",
            poster:"image1",
            title:"Monna 2",
            description: "monna is an upcomming action move",
            duration:130,
            genre:"Animation",
            language:"english",
            releaseDate:"08-12-2020",
        },
        {
            key:"2",
            poster:"image2",
            title:"Pushpa 2",
            description: "push is an action move",
            duration:200,
            genre:"action",
            language:"telugu",
            releaseDate:"03-12-2020",
        }
    ];
    
    const [isModalOpen, setIsmodalOpen]=useState(false);
    const [movies, setMovies]=useState([]);
    const [formType, setFormType]= useState("add")
    const [selectedMovie, setSelectedMovie]=useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen]= useState(false);
    const dispatch=useDispatch(); 


   
    const tableHeaders=[
        {title:"poster", dataIndex:"poster",
            render:(text,data)=>{
                return(
                    <img src={data.poster} height="115" width="75" />
                )
            }
        },
        {title:"Movie Name", dataIndex: "title"},
        {title:"Description", dataIndex: "description"},
        {title:"Duration", 
        dataIndex: "duration",
        render:(text)=>`${text}mins`
        },
        {title:"Genre", dataIndex: "genre"},
        {title:"Lanuage", dataIndex: "language"},
        {title:"Relase Date", dataIndex: "releasedate",
            render:(text,data)=>{
                return moment(data.releasedate).format("DD-MM-YYYY");
            }
        },
        {title: "Action", 
            render:(text,data)=>{
            return (
                <div>
                    <Button onClick={()=>{
                        setIsmodalOpen(true);
                        setSelectedMovie(data);
                        setFormType("edit");
                    }}><EditOutlined/></Button>
                    <Button onClick={()=>{
                        setIsDeleteModalOpen(true);
                        setSelectedMovie(data);
                    }}><DeleteOutlined/></Button>
                </div>
            )
        }}
    ];

    const getData= async()=>{
        dispatch(ShowLoading());
              const userresponse=await GetCurrentUser();
        
              // console.log("protected route failed",response);
              dispatch(SetUser(userresponse.data));
        const response= await getAllMovies();
        // console.log(response)
        const allMovies=response.data;
    // console.log(allMovies)
        setMovies(allMovies.map(function (item){ 
            return {...item, key:`movie${item._id}`};
             })
         );
         dispatch(HideLoading());
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <>
    <div className='d-flex justify-content-end'>
        <Button onClick={()=>{
            setIsmodalOpen(true);
            setFormType("add");
        }}>Add Movie</Button>
    </div>

        <Table dataSource={movies} columns={tableHeaders} />
        {isModalOpen &&(
                  <MovieForm
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsmodalOpen}
                  selectedMovie={selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                  formType={formType}
                  getData={getData}
                />
        )}
        {isDeleteModalOpen &&(
  <DeleteMovieModal
  isDeleteModalOpen={isDeleteModalOpen}
  setIsDeleteModalOpen={setIsDeleteModalOpen}
  selectedMovie={selectedMovie}
  setSelectedMovie={setSelectedMovie}
  getData={getData}
/>        )}


    </>
  )
}

export default MovieList