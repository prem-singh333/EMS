import React, { useEffect, useState } from "react";
import Headings from "./Headings";
import axios from "axios";


export default function Booking() {
  const URL = "http://127.0.0.1:8000/api/booking-events";

  let [participants, setParticipants] = useState([]);

  useEffect(() => {
    let allPariticipants = async () => {
      let token = localStorage.getItem('token')
      let res = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setParticipants(res.data);
      console.log(res.data)
    }

    allPariticipants();
  }, []);

  return (
    <div className="p-5">
      <div className="bg-white border border-gray-200 shadow rounded px-3 py-3">
        <Headings heading="Registerd Candidate" />
        <div className="flex flex-wrap items-strach gap-5 mt-3">
          {participants.map((items, index) => (
          <div className="w-75 pt-3 bg-white border border-gray-200 rounded shadow flex flex-col" key={index}>
            <h1 className="text-xl capitalize font-medium text-gray-700 px-3">
              {items.event.title}
            </h1>
            <p className="text-sm capitalize font-medium text-gray-800 mt-3 px-3">
              {items.event.description}
            </p>

            <ul className="mt-3 px-3 pb-3">
              <li className="font-mono text-gray-800 capitalize">
                Location:  {items.event.location}
              </li>
              <li className="font-mono text-gray-800 capitalize">
                Time:  {items.event.time}
              </li>
              <li className="font-mono text-gray-800 capitalize">
                Date:  {items.event.date}
              </li>
              <li className="font-mono text-gray-800 capitalize">
                Price: &#8377;  {items.event.price}
              </li>
            </ul>

            <div className="border-b border-b-gray-200"></div>
            <h3 className="text-xl font-medium text-gray-700 px-3 py-2 border-b border-b-gray-200">
              Participants
            </h3>
            {items.users.map((user, index) => (

            <ul className="mt-3 px-3 pb-3 border-b border-b-gray-200 last:border-0" key={index}>
              <li className="font-mono text-gray-800 capitalize">
                Candidate Name: {user.name}
              </li>
              <li className="font-mono text-gray-800">
                E-mail: {user.email}
              </li>
            </ul>
            ))}
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
