"use client";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, subDays } from "date-fns";
import { useState, useMemo } from "react";

const calender = ({ handler }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const memoizedDateRange = useMemo(
    () => (
      <DateRange
        editableDateInputs={true}
        onChange={(item) => handleDateChange(item)}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        ranges={state}
      />
    ),
    [state]
  );

  const handleDateChange = (item) => {
    setState([item.selection]);
    handler(item.selection.startDate, item.selection.endDate);
  };

  return <div>{memoizedDateRange}</div>;
};

export default calender;
