import { DatePicker } from "./datePicker";
import { today, getLocalTimeZone } from "@internationalized/date";
import { OverlayContainer } from "@react-aria/overlays";
import React from "react";


const DateEngine = () => {

  let [dateValue, setDateValue] = React.useState(today(getLocalTimeZone()));

  // console.log(value)


  return (
    // < OverlayContainer >
      <div className="max-w-lg text-olive12 dark:text-darkOlive12">
        <DatePicker
          label="Appointment date"
          minValue={today(getLocalTimeZone())}
          defaultValue={dateValue}
          onChange={setDateValue}

        />
      </div>
    // </OverlayContainer>
  );
};

export default DateEngine;
