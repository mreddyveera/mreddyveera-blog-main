import React, { useState, useEffect } from 'react'
import {useLocation} from "react-router-dom";
import DashProfile from '../components/DashProfile.jsx';
import DashSidebar from '../components/DashSidebar.jsx';

function Dashboard() {
  const location=useLocation();
  const [tab,setTab]=useState ("");
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    console.log(urlParams);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <>
    <div className="min-h-screen flex flkex-col md:flex-row">

   
      <div className="md:w-56">
        {/*sidebar*/}
        <DashSidebar/>

      </div>
       
      <div className="flex-1 flex items-center justify-center">
        {tab==="profile" && <DashProfile/>}
      </div>
      </div>
    </>
  )
}

export default Dashboard;
