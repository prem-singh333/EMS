import Events from "./Events";
import BookedEvents from "./BookedEvents";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

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
        <Routes>
          <Route path="/" element={isToken ? <Events /> : <Navigate to="/login"/>} />
          <Route path="/booked-Event" element={isToken ? <BookedEvents /> : <Navigate to="/login"/>} />
           <Route path="/login" element={!isToken ? <Login setIsToken={setIsToken}/> : <Navigate to="/" />}/>

          <Route path="/signup" element={!isToken ? <Signup setIsToken={setIsToken}/> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
