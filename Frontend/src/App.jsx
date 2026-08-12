import React from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import Home from './component/Home'
import Signup from "./component/Signup";
import Login from "./component/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const App = () => {

  const token = localStorage.getItem("token");
  console.log(token);

  return (
  <>
      <Routes>
        <Route path="/" element={token?<Home />:<Navigate to="/login"/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

 <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar
  closeOnClick
  pauseOnHover
  draggable
  toastClassName="my-toast"
/>
    </>
  );
};

export default App;