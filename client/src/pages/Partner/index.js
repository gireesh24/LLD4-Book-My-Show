import React from 'react'
import { Tabs } from 'antd';
import TheaterList from "./TheaterList";
function Partner() {

    const tabIteams=[
        {key:"1", label:"Theatres", children:< TheaterList />}
    ]
    console.log("partner page called")
  return (
   <div>
   <h1>Partner page</h1>
    <Tabs items={tabIteams}/>
    </div>
  )
}

export default Partner