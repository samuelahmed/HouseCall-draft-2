// import "./styles.css";
import { DateField } from "./dateField";
import { TimeField } from "./timeField";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function App() {
  return (
    <div className="ml-12 max-w-lg">
      {/* prettier-ignore */}
      {/* <p className="mt-8 mb-16 text-gray-600">This sandbox shows examples of <strong><code>DateField</code></strong>, and <strong><code>TimeField</code></strong> components built with <a href="https://react-spectrum.adobe.com/react-aria/" rel="noreferrer" target="_blank" className="text-blue-700 underline">React Aria</a> and <a href="http://tailwindcss.com/" rel="noreferrer" target="_blank" className="text-blue-700 underline">Tailwind CSS</a>.</p>
      <h2 className="mb-2 font-bold text-xl text-left">DateField</h2>
      <DateField label="Appointment date" />
      <DateField
        label="Appointment date and time"
        placeholderValue={now(getLocalTimeZone())}
        className="mt-4"
      />
      <h2 className="mb-2 mt-12 font-bold text-xl text-left">TimeField</h2> */}
      <TimeField label="Appointment time" />
    </div>
  );
}
