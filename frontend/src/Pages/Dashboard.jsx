import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "/policelogo.svg";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
const Dashboard = () => {

  

  let navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user_id");
    if (!user) {
      navigate("/");
    }
    
  }, []);
  return (
    <>
      <Navbar />
      <SideBar />
      <div className="md:w-5/4 md:ml-56  ml-44 py-7 md:px-10 px-4 h-[calc(100vh-96px)] overflow-scroll overflow-x-hidden overflow-y-hidden text-black p">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Total Cases</h2>
              <p className="text-3xl font-bold text-center">100</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">New Cases Today</h2>
              <p className="text-3xl font-bold text-center">5</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Notifications</h2>
              <p className="text-3xl font-bold text-center">0</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Graphs</h2>
              <div className="text-center">Graphs Placeholder</div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Additional Graphs</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center">Additional Graphs Placeholder</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
