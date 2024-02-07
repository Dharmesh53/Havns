"use client";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { eachDayOfInterval, addDays } from "date-fns";
import { useState } from "react";

const Calender = ({ handler, disable }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Function to generate an array of dates within a range

  // Function to determine if a date is disabled
  const isDateDisabled = () => {
    //use flatMap to get unique dates and flatten the array instead of for loop
    const dates = disable.flatMap((disabledRange) => {
      const { start, end } = disabledRange.dates;
      return generateDatesArray(start, end);
    });
    return dates;

    // const temp = [];
    // for (let i = 0; i < disable.length; i++) {
    //   const { start, end } = disable[i].dates;
    //   generateDatesArray(start, end).forEach((element) => {
    //     temp.push(element);
    //   });
    // }
    // return temp;
  };
  const generateDatesArray = (startDate, endDate) => {
    return eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });
  };

  const handleDateChange = (item) => {
    setState([item.selection]);
    handler(item.selection.startDate, item.selection.endDate);
  };

  const disabledDates = isDateDisabled();

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => handleDateChange(item)}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        ranges={state}
        direction="vertical"
        // disabledDates={[addDays(new Date(), 4), addDays(new Date(), 7)]}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default Calender;
