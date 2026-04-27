import { useNavigate, useParams } from "react-router-dom";
import Headings from "./Headings";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../sheared-component/Loader";

export default function EditEvent() {
  let { id } = useParams();

  let navigate = useNavigate();

  let [values, setValues] = useState({
    id: id,
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
  });

  let [loader, setLoader] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api/add/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValues({
          ...values,
          title: res.data.data.title,
          description: res.data.data.description,
          date: res.data.data.date,
          time: res.data.data.time,
          location: res.data.data.location,
          price: res.data.data.price,
        });
        console.log(res.data.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  let updateData = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    setLoader(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/add/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(values);
      setLoader(false);
      navigate("/");
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  return loader ? (
    <Loader />
  ) : (
    <div className="w-[95%] m-auto mt-3 px-5 py-2.5 bg-white rounded shadow">
      <Headings heading="Event Updating" />
      <form className="mt-3" onSubmit={updateData}>
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="enter event title"
            name="title"
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />

          <input
            type="text"
            name="location"
            placeholder="enter event location"
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
            value={values.location}
            onChange={(e) => setValues({ ...values, location: e.target.value })}
          />
        </div>
        <br />
        <div className="flex items-center justify-between gap-4">
          <input
            type="date"
            name="date"
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />

          <input
            type="time"
            name="time"
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
            value={values.time}
            onChange={(e) => setValues({ ...values, time: e.target.value })}
          />
        </div>
        <br />

        <div className="flex items-start justify-between gap-4">
          <input
            type="number"
            name="price"
            placeholder="enter ticket price"
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0"
            value={values.price}
            onChange={(e) => setValues({ ...values, price: e.target.value })}
          />

          <textarea
            name="description"
            placeholder="enter event description"
            className="py-1.5 px-2.5 bg-gray-50 border border-gray-200 rounded shadow w-full focus:outline-0 "
            rows={3}
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <br />
        <button
          type="submit"
          className="text-sm font-medium px-2 py-1 cursor-pointer bg-blue-400 text-white rounded hover:bg-blue-500"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
