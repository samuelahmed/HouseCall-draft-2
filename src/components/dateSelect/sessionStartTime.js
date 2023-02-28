// import "./styles.css";
import { DateField } from "./dateField";
import { TimeField } from "./timeField";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function SessionStartTime() {
  return (
    <div className="ml-12 max-w-lg">
      <TimeField label="Session Start" />
    </div>
  );
}
