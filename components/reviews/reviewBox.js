import React from "react";

const reviewBox = () => {
  return (
    <div className="rounded-xl ">
      <div className="flex p-2 gap-4 ">
        <div>
          <div className="bg-black text-white text-xl font-semibold rounded-full flex items-center justify-center h-12 w-12">
            D{/* {(Info?.name || "").toUpperCase().charAt(0)} */}
          </div>
        </div>

        <div>
          <div>
            <div className="font-medium text-base">Dharmesh</div>
            <div className="font-light text-sm">December 2020</div>
          </div>
          <div className="text-base text-gray-500 flex gap-1">
            The staff were friendly and helpful. Beautiful view of the ocean.
            Nice beach nearby. There are several steps down to get to market and
            beach.
          </div>
        </div>
      </div>
    </div>
  );
};

export default reviewBox;
