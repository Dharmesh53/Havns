"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Tour = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between rounded-xl p-4 bg-black virtual_box items-center align-middle">
        <span className="text-white text-[1.15rem]">
          Get a Real-time Glimpse of the Wedding Venue
        </span>
        <button
          role="button"
          className="duration-200 virtual active:scale-90"
          onClick={() => setShowDetails(p => !p)}
        >
          <span className="font-medium">Check Out</span>
        </button>
      </div>
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-2 rounded-xl z-[-1] p-4"
        >
          <form action="submit" className="flex justify-between">
            <div className="flex flex-row">
                <input type="date" name="date" id="def" />
                <input type="time" name="time" id="fds" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default Tour;
