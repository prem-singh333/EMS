import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Login({setIsToken}) {

    let navigate = useNavigate();

    const URL = "http://127.0.0.1:8000/api/login"

    let [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    let [loader, setLoader] = useState(true);

    useEffect(()=>{
        setLoader(false)
    }, [])
    
    let handleForm = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    let formSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoader(true)
            let res = await axios.post(URL, loginForm)
            if(!res.data.success){
                alert("Login failed");
                setLoader(false)
                return;
            }

            let token = res.data.result.token
            if(token){
                localStorage.setItem('token', token)
                setIsToken(true)
                setLoader(false)
                navigate('/')
            }else{
                setLoader(false)
                alert("Token not recived")
            }
            
        }catch(error){
            setLoader(false)
            alert("something went wrong!")
        }
    }
    return (
       loader ? <Loader/> : <div className="md:w-[50%] m-auto mt-5 px-5">
            
            <div className="bg-white border border-gray-200 rounded-xl shadow p-3">
                
            <form onSubmit={formSubmit}>
                <div className="grid grid-cols-1 gap-5">
                    <input type="email" placeholder="Enter your email" name="email" onChange={handleForm} value={loginForm.email} className="px-3 py-2 bg-gray-50 border border-gray-200 shadow rounded"/>
                    <input type="password" placeholder="Set your password" name="password" onChange={handleForm} value={loginForm.password} className="px-3 py-2 bg-gray-50 border border-gray-200 shadow rounded"/>
                </div>
                <button type="submit" className="mt-5 text-sm font-medium px-2 py-1 cursor-pointer bg-blue-400 text-white rounded hover:bg-blue-500">Log In</button>
            </form>
            </div>
        </div>
    )
}

export default Login;