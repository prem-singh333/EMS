import { useState } from "react";
import axios from "axios";

import Headings from "./Headings";
import { useNavigate } from "react-router-dom";
import Loader from "../sheared-component/Loader";

function AddEvent() {
  const URL = "http://127.0.0.1:8000/api/add";
  let [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
  });

  let [loader, setLoader] = useState(false);

  let navigate = useNavigate();

  const handleFields = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    setLoader(true)
    e.preventDefault();
    let token = localStorage.getItem('token');
    try {
      await axios.post(URL, formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoader(false)
      alert("Event was listed successfuly!");
      navigate("/")
    } catch (error) {
      alert(error);
      setLoader(false);
    }
  };

  return (
    loader ? <Loader /> :
    <div className="w-[95%] m-auto mt-3 px-5 py-2.5 bg-white rounded shadow">
      <Headings heading="Add Event" />
      <form onSubmit={submitForm} className="mt-3">
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="enter event title"
            name="title"
            value={formData.title}
            onChange={handleFields}
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
          />

          <input
            type="text"
            name="location"
            placeholder="enter event location"
            value={formData.location}
            onChange={handleFields}
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
          />
        </div>
        <br />
        <div className="flex items-center justify-between gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFields}
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleFields}
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
          />
        </div>
        <br />

        <div className="flex items-start justify-between gap-4">

          <input
            type="number"
            name="price"
            placeholder="enter ticket price"
            value={formData.price}
            onChange={handleFields}
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
          />
        
        <textarea
          name="description"
          placeholder="enter event description"
          value={formData.description}
          onChange={handleFields}
          className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0 "
          rows={3}
        ></textarea>
        </div>
        <br />
        <br />
        <button
          type="submit"
          className="text-sm font-medium px-2 py-1 cursor-pointer bg-blue-400 text-white rounded hover:bg-blue-500"
        >
          List Event!
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
