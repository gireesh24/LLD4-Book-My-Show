import React from 'react'
import { Tabs } from 'antd';
import MovieList from './MovieList';
import TheaterTable from './TheaterTable';

function Admin() {

    const tabIteams=[
        {key:"1", label:"movies", children:<MovieList /> },
        {key:"2", label:"Theaters", children: <TheaterTable /> }
    
    ];
  return (
    <div>
        <h1>Admin</h1>
        <Tabs items={tabIteams} />
    </div>
  )
}

export default Admin