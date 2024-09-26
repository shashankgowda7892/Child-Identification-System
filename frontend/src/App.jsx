import reactdom from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./Components/Login";
import Dashboard from "./Pages/Dashboard";
import AllCases from './Pages/AllCases';
import NewCases from './Pages/NewCases';
import Notification from './Pages/Notification';
import Contact from './Pages/Contact'
import Card from './Components/Card'

function App() {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        
        <Routes>
            <Route index path="/" element={<Login />} />
            <Route  path="/dashboard" element={<Dashboard />} />
            <Route  path="/all_cases"  element={<AllCases />} />
            <Route  path="/new_case" element={<NewCases />} />
            <Route  path="/notifications" element={<Notification />} />
            <Route  path="/contact" element={<Contact />} />      
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
