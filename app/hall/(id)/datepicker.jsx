import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";

const datepicker = () => {
 const [state, setState] = useState([
   {
     startDate: addDays(new Date(),0),
     endDate: addDays(new Date(),7),
     key: "selection",
   },
 ]);
  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  );
};

export default datepicker;
