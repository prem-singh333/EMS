import "./App.css";
import AddEvent from "./eventPages/AddEvent";
import AllEvent from "./eventPages/AllEvents";
import EditEvent from "./eventPages/EditEvent";
import Layout from "./sheared-component/Layout";
import Navbar from "./sheared-component/Navbar";
import Signup from "./usersAuth/Signup";
import Login from "./usersAuth/Login";
import Booking from "./eventPages/Booking";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  let [isToken, setIsToken] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    setIsToken(!!token);
  }, []);

  return (
    <>
      <BrowserRouter>
      <Navbar isToken={isToken} setIsToken={setIsToken}/>

      {/* {isToken} */}

        <Routes>
          <Route path="/" element={isToken ? <AllEvent /> : <Navigate to="/login"/>} />
          <Route path="/create" element={isToken ? <AddEvent /> : <Navigate to="/login"/>} />
          <Route path="/edit/:id" element={isToken ? <EditEvent /> : <Navigate to="/login"/>} />
          <Route path="/booking" element={isToken ? <Booking /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!isToken ? <Login setIsToken={setIsToken}/> : <Navigate to="/" />}/>

          <Route path="/signup" element={!isToken ? <Signup setIsToken={setIsToken}/> : <Navigate to="/" />} />
          {/* <Route path="/login" element={<Login />}/>

          <Route path="/signup" element={ <Signup />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
