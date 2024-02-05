"use client";
import Calender from "./datepicker";
import { useState } from "react";

const prices = ({ rates }) => {
  const [dates, setDates] = useState({
    start: null,
    end: null,
  });

  const [isReserving, setIsReserving] = useState(false);

  const changer = (start, end) => {
    setDates({ start, end });
  };

  const booker = async () => {
    try {
      setIsReserving(true);

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ dates, hallId: rates._id }),
      };
      const res = await fetch("/api/hall/dates", options);
      // if (res.status === 200) {
      //   alert("Reservation successful!");
      // } else if (res.status === 500) {
      //   alert("Server error. Please sign in.");
      // } else {
      //   alert(`Unexpected error: ${res.statusText}`);
      // }
    } catch (error) {
      console.error("Error during reservation:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="rounded-2xl booker border-2 flex flex-col gap-2 ">
      <div className="flex mx-5 items-baseline py-4 gap-1 justify-between">
        <div>
          <span className="font-bold text-2xl">4.97</span>
          <span>&#9733; </span>
        </div>
        <span className="text-slate-500 text-sm w-[32%]">
          {" "}
          30 &#183; Reviews
        </span>
      </div>
      <div className="flex flex-col gap-1 mx-5">
        <div className=" flex justify-between ">
          <span className="underline">Vegetarian Plate</span>
          <span className="w-[30%]">
            ₹ {rates.veg ? rates.veg.toLocaleString("en-IN") : "-----"}
          </span>
        </div>
        <div className=" flex justify-between ">
          <span className="underline">Non-Vegetarian Plate</span>
          <span className="w-[30%]">
            ₹ {rates.nonveg ? rates.nonveg.toLocaleString("en-IN") : "-----"}
          </span>
        </div>
        <div className=" flex justify-between ">
          <span className="underline">Rooms</span>
          <span className="w-[30%]">
            ₹ {rates.room ? rates.room.toLocaleString("en-IN") : "-----"}
          </span>
        </div>
        <div className=" flex justify-between ">
          <span className="underline">Extra Decoration</span>
          <span className="w-[30%]">
            ₹ {rates.decor ? rates.decor.toLocaleString("en-IN") : "-----"}
          </span>
        </div>
        <div className=" flex justify-between ">
          <span className="underline">Havns Service fees</span>
          <span className="w-[30%]">₹ {rates.decor ? "10,000" : "-----"}</span>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <Calender handler={changer} />
      </div>
      <span className=" bg-[#ef4444] text-lg p-[0.42rem] text-white font-medium rounded-b-2xl">
        <button
          disabled={isReserving}
          className="active:text-base w-full duration-150"
          onClick={() => booker()}
        >
          {isReserving ? "Reserving..." : "Reserve Now"}
        </button>
      </span>
    </div>
  );
};

export default prices;
