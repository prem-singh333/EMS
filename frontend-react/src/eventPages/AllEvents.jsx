import { useEffect, useState } from "react";
import axios from "axios";
import Headings from "./Headings";
import { Link } from "react-router-dom";
import Loader from "../sheared-component/loader";

export default function AllEvent() {
  const URL = "http://127.0.0.1:8000/api/add";
  let [eventData, setEventData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let getAllEvents = async () => {
      try {
        let token = localStorage.getItem("token")
        let res = await axios.get(URL,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLoading(false);
        setEventData(res.data.data);
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };

    getAllEvents();
  }, []);

  let eventDelete = async (id) => {
    setLoading(true);
    let token = localStorage.getItem('token')
    try {
      await axios.delete(`${URL}/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Event deleted successfuly!");
      let res = await axios.get(URL);
      setEventData(res.data.data);
      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-[95%] m-auto mt-3 bg-white rounded shadow">
      <div className="px-5 py-2.5">
        <Headings heading="All Events" />
      </div>
      <table className="mt-3 px-5 py-2.5 w-full">
        <thead>
          <tr className="bg-blue-50 text-gray-800">
            <th className="py-1.5 px-2 font-medium">Sl&nbsp;No.</th>
            <th className="py-1.5 px-2 font-medium">Title</th>
            <th className="py-1.5 px-2 font-medium">Description</th>
            <th className="py-1.5 px-2 font-medium">Location</th>
            <th className="py-1.5 px-2 font-medium">Date</th>
            <th className="py-1.5 px-2 font-medium">Time</th>
            <th className="py-1.5 px-2 font-medium">Price</th>
            <th className="py-1.5 px-2 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {eventData.length === 0 ? (
            <tr>

              <td colSpan={8} className="text-center px-2 py-2.5">No events available</td>
            </tr>
          ) : (
            eventData.map((events, index) => (
              <tr
                key={index}
                className="font-medium text-gray-600 even:bg-gray-100"
              >
                <td className="px-2 py-1.5">{index + 1}</td>
                <td className="px-2 py-1.5">{events.title}</td>
                <td className="px-2 py-1.5">{events.description}</td>
                <td className="px-2 py-1.5 text-center">{events.location}</td>
                <td className="px-2 py-1.5 w-32 text-center">{events.date}</td>
                <td className="px-2 py-1.5">{events.time}</td>
                <td className="px-2 py-1.5 text-center">{events.price}/-</td>
                <td className="px-2 py-1.5 w-37.5 text-center">
                  <button
                    onClick={() => eventDelete(events.id)}
                    className="text-sm font-medium px-2 py-1 cursor-pointer bg-red-400 text-white rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <Link
                    to={`/edit/${events.id}`}
                    className="text-sm font-medium px-2 py-1 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
