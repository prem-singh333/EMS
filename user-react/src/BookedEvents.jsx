import React from 'react'
import axios from "axios";
import EventCard from './EventCard';
import { useState, useEffect } from 'react';
import SubHeader from './SubHeader';



export default function BookedEvents() {

  const URL = "http://127.0.0.1:8000/api/my-bookings";
  let [events, setEvents] = useState([]);
  
  useEffect(() => {
    let getBookings = async () => {
      let token = localStorage.getItem('token');
      let result = await axios.get(URL, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      console.log(result.data);
      setEvents(result.data);
    }

    getBookings()
  }, [])
  return (
    <div className="p-5">
        <SubHeader heading="My Events"/>
    <div className="flex flex-wrap items-stretch gap-5 mt-5">
          {events.map((items, index) => (
            <EventCard
              key={index}
              title={items.event.title}
              location={items.event.location}
              description={items.event.description}
              price={items.event.price}
              date={items.event.date}
              time={items.event.time}
            />
          ))}
        </div>
        </div>
  )
}

