import React from "react";
import axios from "axios";

export default function EventCard({
  id,
  title,
  location,
  description,
  price,
  time,
  date,
  showButton
}) {
    const joinUrl = "http://127.0.0.1:8000/api/join-event";
  let joinEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        joinUrl,
        { event_id: eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(res.data.msg);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("you have already joined this event");
      } else {
        alert("Somthing went wrong");
      }
      // console.log(error);
    }
  };
  return (
    // <div className="flex flex-wrap items-stretch gap-5 p-5 mt-3">
      <div className="w-75 pt-3 bg-white border border-gray-200 rounded shadow flex flex-col">
        <h1 className="text-xl capitalize font-medium text-gray-700 px-3">
          {title}
        </h1>
        <p className="text-sm capitalize font-medium text-gray-800 mt-3 px-3">
          {description}
        </p>

        <ul className="mt-3 px-3 pb-3">
          <li className="font-mono text-gray-800 capitalize">
            Location: {location}
          </li>
          <li className="font-mono text-gray-800 capitalize">Time: {time}</li>
          <li className="font-mono text-gray-800 capitalize">Date: {date}</li>
          <li className="font-mono text-gray-800 capitalize">
            Price: {price}/-
          </li>
        </ul>

{showButton && <button
          className="mt-auto bg-gray-700 px-3 py-1 text-sm font-medium text-white rounded-b cursor-pointer hover:opacity-90"
          onClick={() => joinEvent(id)}
        >
          Book Ticket
        </button>}
        
      </div>
    // </div>
  );
}
