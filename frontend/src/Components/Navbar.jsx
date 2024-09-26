import React from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';


import logo from "/policelogo.svg";
const Navbar = () => {
  let navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem("user_id")
    toast.success("Logged Out Successfully !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    navigate("/")

  }
  return (
    <>
      <nav className="flex w-full h-24 items-center justify-between px-10 md:px-24  bg-zinc-300">
        <div className="md:w-24 py-3 w-16 bg-white rounded-full">
          <img
            className="w-full h-full rounded-full"
            src={logo}
            alt="Police Logo"
          />
        </div>
        <div>
          <button onClick={logout} className="px-8 py-2 md:py-3 md:px-14 md:text-xl rounded-xl font-bold text-l hover:bg-red-600 hover:text-white bg-green-400">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
