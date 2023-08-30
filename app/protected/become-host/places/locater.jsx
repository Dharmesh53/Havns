"use client";
import { useState, useEffect } from "react";
import { PiMapPinBold } from "react-icons/pi";
import { TbNavigation } from "react-icons/tb";
import Loading from "@components/Loading";

const locater = ({ Address, setAddress }) => {
  const [Current, setCurrent] = useState();
  const [Loader, setLoader] = useState(false);

  const handleClickBody = (event) => {
    if (Current && !event.target.closest(".location")) setCurrent(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickBody);
    return () => document.removeEventListener("click", handleClickBody);
  }, [Current]);

  const userlocation = async () => {
    setLoader(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const url = `https://feroeg-reverse-geocoding.p.rapidapi.com/address?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=en&mode=text&format='%5BSN%5B%2C%20%5D%20-%20%5B23456789ab%5B%2C%20%5D'`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MAPS_API_KEY,
            "X-RapidAPI-Host": "feroeg-reverse-geocoding.p.rapidapi.com",
          },
        };
        try {
          const response = await fetch(url, options);
          const data = await response.text();
          setLoader(false);
          setAddress({ ...Address, loca: data});
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  return (
    <div>
      <div className="mt-10 relative block rounded-lg location">
        <form action="">
          <span
            className={`absolute left-0 flex items-center pl-2 text-2xl ${
              Current ? "top-[1.1rem]" : "inset-y-0"
            }`}
          >
            <PiMapPinBold />
          </span>
          <input
            type="text"
            className=" border-2 w-full px-9 placeholder:text-gray-500 bg-white active:border-black p-4 rounded-lg "
            placeholder="Enter your Address"
            value={Address.loca}
            onChange={(e) => setAddress({ ...Address, loca: e.target.value })}
            onClick={() => setCurrent((t) => !t)}
            required
          />
        </form>
        {Current && (
          <div
            className="bg-white px-9 flex justify-between p-4 rounded-lg hover:bg-slate-100"
            onClick={userlocation}
          >
            <span
              className={`absolute left-0 flex items-center pl-2 text-2xl bottom-[1.1rem] `}
            >
              <TbNavigation />
            </span>
            <button>Use Current Location</button>
            {Loader && <Loading />}
          </div>
        )}
      </div>
    </div>
  );
};

export default locater;
