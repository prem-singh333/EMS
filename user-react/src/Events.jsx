import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import SubHeader from "./SubHeader";

export default function Events({
  title,
  description,
  location,
  price,
  time,
  date,
}) {
  let URL = "http://127.0.0.1:8000/api/add";
  
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

  return (
    <div className="p-5">
    <SubHeader heading="All Events"/>
    <div className="flex flex-wrap items-stretch gap-5 mt-5">
      {events.map((event, index) => (
        <EventCard
          key={index}
          id={event.id}
          title={event.title}
          location={event.location}
          description={event.description}
          price={event.price}
          date={event.date}
          time={event.time}
          showButton={true}
        />
      ))}
    </div>
    </div>
  );
}
