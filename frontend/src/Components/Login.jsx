import  { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';

import logo from "/policelogo.svg";

const Login = () => {


  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInput = (e) => {
    let name = e.target.name
    let value = e.target.value

    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handler = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(user));
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Server Response:", data.user.station_id);
        localStorage.setItem("user_id",data.user.station_id)
        
        toast.success('LoggedIn Successfully !', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

          });

          navigate("/dashboard");
          
        // 
      } else {
        toast.error("Check Your Credentials", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

          });

      }
      
    } catch (error) {
      toast.error('Server error', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
        });

      // console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="mt-20 md:m-0 md:w-screen md:h-screen">
        <div className="flex flex-col items-center w-auto h-auto sm:w-full sm:h-full  md:flex-row">
          <div className="b">
            <img
              className="w-full h-full "
              src={logo}
              alt="Police Logo"
            />
          </div>

          <div className="w-[70%]  md:ml-10 md:w-1/2 ">
            <form onSubmit={handler} className="flex flex-col">
              <span className="block text-2xl md:text-3xl text-black font-bold">
                Username :
              </span>
              <input
                className="md:w-1/2 py-2 mt-3 border-2 focus:border-gray-500"
                type="text"
                name="email"
                value={user.email}
                onChange={onInput}
              />
              <span className="block text-2xl md:text-3xl text-black font-bold">
                Password :
              </span>

              <input
                type="password"
                className="md:w-1/2 py-2 mt-3 border-2 focus:border-gray-500"
                name="password"
                value={user.password}
                onChange={onInput}
              />

              <button
                type="submit"
                className="md:w-1/2 text-white md:bg-red-700 bg-green-400 font-semibold text-lg py-3 px-20 rounded-xl mt-3"
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
