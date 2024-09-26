import React from 'react'
import { Link } from "react-router-dom";
import Dashboard from '../Pages/Dashboard';
import AllCases from '../Pages/AllCases';
import NewCases from '../Pages/NewCases';
import Notification from '../Pages/Notification';
import Contact from '../Pages/Contact'

const SideBar = ({pageState,setPageState}) => {
  return (
    <>
    <div className="w-1/3 md:w-56 bg-zinc-200 h-[80%]  flex flex-col  items-center mt-8 py-12 gap-32 text-lg font-bold absolute" >
        <div className="pr-1 hover:text-white px-5 hover:text-2xl active:bg-black">
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="pr-1 hover:text-white px-5 hover:text-2xl ">
          <Link to="/all_cases">All Cases</Link>
        </div>
        <div className="pr-1 hover:text-white px-5 hover:text-2xl ">
          <Link to="/new_case">New Case</Link>
        </div>
        <div className="pr-1 hover:text-white px-5 hover:text-2xl ">
          <Link to="/notifications">Notification</Link>
        </div>
        <div className="pr-1 hover:text-white px-5 hover:text-2xl ">
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    
    </>
  )
}

export default SideBar