import { DatePicker } from "./datePicker";
import { today, getLocalTimeZone } from "@internationalized/date";
import { OverlayContainer } from "@react-aria/overlays";


const DateEngine = () => {
  return (
    // < OverlayContainer >
      <div className="ml-12 max-w-lg text-gray-700">
        <DatePicker
          label="Appointment date"
          minValue={today(getLocalTimeZone())}
        />
      </div>
    // </OverlayContainer>
  );
};

export default DateEngine;
