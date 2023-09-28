import React from "react";

const tour = () => {
  return (
    <div className="flex justify-between rounded-xl p-4 bg-black virtual_box items-center align-middle">
      <span className="text-white text-[1.15rem]">
        Get a Real-time Glimpse of the Wedding Venue
      </span>
      <button role="button" className="duration-200 virtual active:scale-90">
        <span className="font-medium">Check Out</span>
      </button>
    </div>
  );
};

export default tour;
