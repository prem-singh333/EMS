import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Signup({setIsToken}){

    let navigate = useNavigate();

    const URL = "http://127.0.0.1:8000/api/signup";

    let [signupForm, setSignupForm] = useState({
        name: "",
        email: "",
        password: ""
    })

        let [loader, setLoader] = useState(true);

        useEffect(() =>{
            setLoader(false)
        }, [])

    let handleForm = (e) => {
        setSignupForm({
            ...signupForm,
            [e.target.name]: e.target.value
        })
    }

    let formSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoader(true)
            let res = await axios.post(URL, signupForm);
            let token = res.data.result.token;
            if(token){
                localStorage.setItem('token', token)
                setIsToken(true)
                alert(res.data.msg);
                navigate('/login');
                setLoader(false)
            }
        }catch(error){
            alert(error)
            setLoader(false)
        }
    }

    return (
        loader ? <Loader/> :
        <div className="md:w-[50%] m-auto mt-5 px-5">

            <div className="bg-white border border-gray-200 rounded-xl shadow p-3">
                <Link to="/login" className="flex items-center justify-end text-sm font-medium text-blue-800 hover:underline">Log In</Link>

            <form onSubmit={formSubmit} className="mt-3">
                <div className="grid grid-cols-1 gap-5">
                    <input type="text" placeholder="Enter your name" name="name" onChange={handleForm} value={signupForm.name} className="px-3 py-2 bg-gray-50 border border-gray-200 shadow rounded"/>
                    <input type="email" placeholder="Enter your email" name="email" onChange={handleForm} value={signupForm.email} className="px-3 py-2 bg-gray-50 border border-gray-200 shadow rounded"/>
                    <input type="password" placeholder="Set your password" name="password" onChange={handleForm} value={signupForm.password} className="px-3 py-2 bg-gray-50 border border-gray-200 shadow rounded"/>
                </div>
                <button type="submit" className="mt-5 text-sm font-medium px-2 py-1 cursor-pointer bg-blue-400 text-white rounded hover:bg-blue-500">Sign Up</button>
            </form>
            </div>
        </div>
    )
}

export default Signup;