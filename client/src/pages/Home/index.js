import React from 'react';
import { useEffect, useState } from 'react';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { getAllMovies } from '../../api/movies';
import { message,Row,Col,Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';


const Home= ()=> {
const [movies, setMovies]=useState(null);
const [searchText, setSearchText]=useState("");
const dispatch=useDispatch();
const navigate=useNavigate();

const getData= async()=>{
  try{
    dispatch(ShowLoading());
    const response= await  getAllMovies();
    // console.log("get data try block", response.data)

    if(response.success){
      setMovies(response.data);
      dispatch(HideLoading());
      // console.log("get all movies data",response.data);
    }
    else{
      // console.log("get data else block", response,response.message)
      // message.error(response.message);
      message.error(response.message)
    }
  }catch(err){
    console.log("getdata catch block", err.message);
    dispatch(HideLoading());
  }
}

useEffect(()=>{
  getData();
},[]);

// handleSearch
const handleSearch= (e)=>{
  setSearchText(e.target.value);
  // console.log(searchText);
}

  return (
    <>
    <Row className='justify-content-center w-100'>
    <Col xs={{span:24}} lg={{span:12}}>
    <Input placeholder='type here to search movies'
           onChange={handleSearch}
           prefix={<SearchOutlined />}
      />
      <br />
      <br />
      <br />
    </Col>
    </Row>
      <Row className='justify-content-center'
            gutter={{
              xs:8,
              sm:16,
              md:24,
              lg:32
            }}
        >
          {movies && 
            movies.filter((movie)=>movie.title.toLowerCase().includes(searchText.toLowerCase())
          ).map((movie)=><Col className='gutter-row mb-5'
           key={movie._id}
           span={{
            xs:24,
            sm:24,
            md:12,
            lg:10
           }}
           >
            <div className='text-center'>
              <img 
                onClick={()=>{
                  navigate(`/movie/${movie._id}?date=${moment().format(
                    "YYYY-MM-DD"
                  )}`
                );
                }}
                className='cursor-pointer'
                src={movie.poster}
                alt='movie poster'
                width={200}
                style={{borderRadius:"8px"}}
              />
              <h3
                onClick={()=>{
                  navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)
                }}
                className='cursor-pointer'
              >
                  {movie.title}
              </h3>
            </div>
          
          </Col>)
          }
      </Row>
    </>
  )
}

export default Home