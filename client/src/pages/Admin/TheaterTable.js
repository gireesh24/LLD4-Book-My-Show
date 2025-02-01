import React from 'react';
import { useState,useEffect } from 'react';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { Button, message, Table } from 'antd';
import { getAllTheatresFromAdmin, updateTheatre } from '../../api/theatres';


const TheaterTable=()=> {
const [theatres, setTheatres]=useState([]);
const dispatch=useDispatch();

const getDate=async()=>{
  try{
    dispatch(ShowLoading());
     console.log("get data tryblock")
    const response=await getAllTheatresFromAdmin();
    console.log("get data tryblock", response.success)
    if(response.success){
      const allTheatres=response.data;
      setTheatres(
        allTheatres.map(function(item){
          return {...item, key:`theatre${item._id}`}
        })
      )
    }else{
      console.log("getdata else block")
      message.error(response.message)
    }
    dispatch(HideLoading())
  }catch(err){
    console.log("GetData failed",err.message);
    dispatch(HideLoading());
  }
}

const handleStatusChange=async(theatre)=>{
try{
  dispatch(ShowLoading());
  let values={
    ...theatre,
    theatreId:theatre._id,
    isActive: !theatre.isActive
  }
  const response=await updateTheatre(values);
  console.log("update theatre response", response, theatre);
  if(response.success){
    message.success(response.message);
    getDate();
  }
  dispatch(HideLoading());
}catch(err){
  console.log("GetData failed",err.message);
  dispatch(HideLoading());
}
}

const columns=[
  {
    title:"name",
    dataIndex:"name",
    key:"name"
  },{
    title:"Address",
    dataIndex:"address",
    key:"address"
  },
  {
    title:"owner",
    dataIndex:"owner",
    render:(text,data)=>{
      return data.owner && data.owner.name
    }
  },{
    title:"Phone number",
    dataIndex:"phoneNumber",
    key:"phoneNumber"
  },{
    title:"Email",
    dataIndex:"email",
    key:"email"
  },{
    title:"status",
    dataIndex:"status",
    render:(text,data)=>{
      if(data.isActive){
        return "Approved"
      }else{
        return "Pending/Blocked"
      }
    }
  },
  {
    title:"Action",
    dataIndex:"action",
    render:(text,data)=>{
      return (
        <div className='d-flex align-items-centre gap-10'>
          {data.isActive ?(
            <Button onClick={()=>handleStatusChange(data)}>Block</Button>
          ):(
            <Button onClick={()=>handleStatusChange(data)}>Approved</Button>
          )
          }
        </div>
      )
    }
  }
]

useEffect(()=>{
  getDate();
},[]);

  return (
    <>
    {theatres && theatres.length>0 &&(
      <Table dataSource={theatres} columns={columns}/>
    )}
    <h3>thatres
    </h3>
    </>
  )
}

export default TheaterTable