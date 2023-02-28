// import "./styles.css";
import { DateField } from "./dateField";
import { TimeField } from "./timeField";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function SessionEndTime() {
  return (
    <div className="ml-12 max-w-lg">
      <TimeField 
      onChange={(e) =>
        setInputs((prev) => ({
          ...prev,
          overview: e.target.value,
        }))
      }
      label="Session End" />
    </div>
  );
}
