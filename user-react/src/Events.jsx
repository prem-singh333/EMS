import { useEffect, useState } from "react";
import axios from "axios";


export default function Events({
  title,
  description,
  location,
  price,
  time,
  date,
}) {
  let URL = "http://127.0.0.1:8000/api/add";
  const joinUrl = "http://127.0.0.1:8000/api/join-event";
  let [events, setEvents] = useState([]);
    // let [loading, setLoading] = useState(true);

  useEffect(() => {
    let getAllEvents = async () => {
      try {
        let token = localStorage.getItem("token");
        let res = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setLoading(false);
        setEvents(res.data.data);
      } catch (error) {
        // setLoading(false);
        alert(error);
      }
    };

    getAllEvents();
  }, []);

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
      if(error.response && error.response.status === 400){
        alert("you have already joined this event")
      }else{
        alert("Somthing went wrong")
      }
      // console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap items-stretch gap-5 p-5 mt-3">
      {events.map((res, index) => (
        <div
          className="w-75 pt-3 bg-white border border-gray-200 rounded shadow flex flex-col"
          key={res.id}
        >
          <h1 className="text-xl capitalize font-medium text-gray-700 px-3">
            {res.title}
          </h1>
          <p className="text-sm capitalize font-medium text-gray-800 mt-3 px-3">
            {res.description}
          </p>

          <ul className="mt-3 px-3 pb-3">
            <li className="font-mono text-gray-800 capitalize">
              Location: {res.location}
            </li>
            <li className="font-mono text-gray-800 capitalize">
              Time: {res.time}
            </li>
            <li className="font-mono text-gray-800 capitalize">
              Date: {res.date}
            </li>
            <li className="font-mono text-gray-800 capitalize">
              Price: &#8377; {res.price}/-
            </li>
          </ul>

          <button
            className="mt-auto bg-gray-700 px-3 py-1 text-sm font-medium text-white rounded-b cursor-pointer hover:opacity-90"
            onClick={() => joinEvent(res.id)}
          >
            Book Ticket
          </button>
        </div>
      ))}
    </div>
  );
}
