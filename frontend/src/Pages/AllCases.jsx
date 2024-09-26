import React, { useEffect, useState } from "react";
import Card from '../Components/Card';

import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
const AllCases = () => {


  const [cases, setCases] = useState([]);
  const all_cases = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/all_cases",{method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "user_id" : localStorage.getItem("user_id")}) 
      });
      if (response.ok) {
        let data = await response.json();
        let cases = JSON.parse(data.cases);
        // console.log(data);
        console.log(cases);
        setCases(cases)
      }
    } catch (error) {
      console.log("Error");
    }
  };

  let navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user_id");
    if (!user) {
      navigate("/");
    }
    all_cases();
  }, []);

  return (
    <>
      <Navbar />
      <SideBar />
      
      <div className="md:w-5/4 md:ml-56  flex flex-wrap gap-5 ml-44 py-7 md:px-10 px-4 h-[calc(100vh-96px)] overflow-scroll overflow-x-hidden  text-black p">

       <Card  cases ={cases} />

      </div>

      
    </>
  );
};

export default AllCases;
