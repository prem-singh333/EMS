import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import AllEvent from "../eventPages/AllEvents";
import { useState, useEffect } from "react";

function Navbar({isToken, setIsToken}) {

  // let [isToken, setToken] = useState(null);
  let navigate = useNavigate();


  useEffect(() => {
    setIsToken(false)
  }, [])

  let logOut = () => {
    localStorage.removeItem('token');
    setIsToken(false);
    navigate('/login')
    console.log("Hello World!")
  }

  return (
    <>
      <header className="h-12 py-2.5 px-5 bg-white border-b border-b-gray-200">
        <div className="flex items-center justify-end gap-6">
            <Link to="/">Home</Link>
            <Link to="/create">Create Event</Link>
            <Link to="/booking">Bookings</Link>
            {isToken ? 
            <button className="text-sm font-medium px-2 py-1 cursor-pointer bg-blue-400 text-white rounded hover:bg-blue-500" onClick={logOut}>Log out</button> : <Link to="/signup">Sign Up</Link>}
             
        </div>
      </header>
    </>
  );
}

export default Navbar;
