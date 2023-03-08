import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { useState } from "react";
import type { CareSession } from "@prisma/client";
import { useRouter } from "next/router";
import * as Label from "@radix-ui/react-label";
import DateEngine from "../dateSelect/dateEngine";
// import SessionStartTime from "../dateSelect/sessionStartTime";
// import SessionEndTime from "../dateSelect/sessionEndTime";
import { TimeField } from "../dateSelect/timeField";
import { time } from "console";
import { useTimeField } from "@react-aria/datepicker";
import { Time } from "@internationalized/date";
import { today, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "../dateSelect/datePicker";

// turn off strict mode
const CreateSession = () => {
  const [items, setItems] = useState<CareSession[]>([]);
  const router = useRouter();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();
  // let [value, setValue] = useState();

  const { mutate } = trpc.careSessionAPIs.createOneCareSession.useMutation({
    onSuccess(newSession) {
      alert("Meow! Session successfully created!");
      setItems((prev) => [...prev, newSession]);
      router.push("/dashboard/patient/new");
    },
  });

  //maybe all this type definition is not necessary?
  type StartTime = {
    hour: number;
    minute: number;
    second: number;
  };

  const [startTime, setStartTime] = useState<StartTime>({
    hour: 0,
    minute: 0,
    second: 0,
  });

  type EndTime = {
    hour: number;
    minute: number;
    second: number;
  };
  const [endTime, setEndTime] = useState<EndTime>({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const [dateValue, setDateValue] = useState(today(getLocalTimeZone()));

  // console.log(dateValue.day)
  // console.log(dateValue.month)

  // console.log(dateValue.day)

  const [inputs, setInputs] = useState({
    name: data?.username || "",
    address: data?.address || "",
    medicalNotes: "",
    overview: "",
    title: "",
    hourlyRate: 20,
    totalHours: Math.ceil(endTime.hour - startTime.hour),
    totalCompensation: 20,
    acceptedCaregiverId: "",
    careSessionStatus: "",

    //calendar stuff
    sessionDay: dateValue.day,
    sessionMonth: dateValue.month,
    sessionYear: dateValue.year,
    sessionStartHour: startTime.hour,
    sessionStartMinute: startTime.minute,
    sessionEndHour: endTime.hour,
    sessionEndMinute: endTime.minute,

    //location stuff
    city: "",
    postalCode: "",
    location: "",
  });
  // console.log(startTime)
  // console.log(startTime.hour)

  // console.log(inputs.sessionStartHour)

  useEffect(() => {
    setInputs((inputs) => ({
      ...inputs,
      sessionDay: dateValue.day,
      sessionMonth: dateValue.month,
      sessionYear: dateValue.year,
      sessionStartHour: startTime.hour,
      sessionStartMinute: startTime.minute,
      sessionEndHour: endTime.hour,
      sessionEndMinute: endTime.minute,
    }));
  }, [
    dateValue,
    endTime.hour,
    endTime.minute,
    startTime.hour,
    startTime.minute,
  ]);

  useEffect(() => {
    // const hours = endTime && startTime ? endTime.hour - startTime.hour : 0;
    // const minutes =
    //   endTime && startTime ? endTime.minute - startTime.minute : 0;
    // const seconds =
    //   endTime && startTime ? endTime.second - startTime.second : 0;
    const totalHours = Math.ceil(
      endTime.hour +
        endTime.minute / 60 -
        (startTime.hour + startTime.minute / 60)
    );
    const totalCompensation = totalHours * inputs.hourlyRate;
    setInputs((prevInputs) => ({
      ...prevInputs,
      totalHours,
      totalCompensation,
    }));
  }, [startTime, endTime, inputs.hourlyRate]);

  const totalComp = Math.ceil(inputs.totalHours * inputs.hourlyRate);

  useEffect(() => {
    setInputs((prev) => {
      return {
        ...prev,
        totalCompensation: prev.hourlyRate * prev.totalHours,
        careSessionStatus: "New",
      };
    });
  }, [inputs.hourlyRate, inputs.totalHours]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      name: data?.username || "",
      address: data?.address || "",
    }));
  }, [data?.username, data?.address]);

  const publish = () => {
    mutate(inputs);
  };

  return (
    <>
      {/* <div  className=" max-h-fit overflow-scroll border 
  border-blue6 bg-blue2 dark:border-darkBlue6 dark:bg-darkBlue2 md:col-span-1"
      > */}
      <div className="  py-4">
        <div className="my-4  overflow-auto bg-blue2 text-olive12 dark:bg-darkBlue2 dark:text-darkOlive12">
          <div className="grid grid-cols-1 space-y-2 md:grid-cols-2  md:space-x-4 md:space-y-0">
            <div className="col-span-1">
              <div className=" min-h-88vh border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                <h1 className="text-center text-lg font-extralight">
                  Overview
                </h1>

                <div className="  mx-4 mb-2 flex max-w-fit flex-col text-sm">
                  <Label.Root className="px-0.5" htmlFor="firstName">
                    Session Type
                  </Label.Root>
                  <select
                    value={inputs.title}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="min-w-max border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                  >
                    <option>Mobility Support </option>
                    <option>Personal Care</option>
                    <option>Home Care</option>
                    <option>Transportation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="  mx-4 mb-2 flex max-w-fit flex-col text-sm">
                  <Label.Root className="px-0.5" htmlFor="firstName">
                    First name
                  </Label.Root>
                  <input
                    className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                    type="text"
                    id="firstName"
                    defaultValue={data && data?.username ? data?.username : ""}
                  />
                </div>

                <div className="  mx-4 mb-2 flex max-w-fit flex-col text-sm">
                  <div className="max-w-lg text-olive12 dark:text-darkOlive12">
                    <DatePicker
                      label="Appointment date"
                      minValue={today(getLocalTimeZone())}
                      defaultValue={dateValue}
                      onChange={setDateValue}
                    />
                  </div>
                </div>

                <div className="  mx-4 mb-2 flex max-w-fit flex-row space-x-4 text-sm">
                  <TimeField
                    label="Session Start"
                    defaultValue={startTime}
                    onChange={setStartTime}
                  />

                  <TimeField
                    label="Session End"
                    defaultValue={endTime}
                    onChange={setEndTime}
                  />
                </div>

                <div className="mx-4 mb-2 flex w-full flex-col  pt-2 pr-6 text-sm ">
                  <Label.Root className="px-0.5" htmlFor="firstName">
                    Describe Session
                  </Label.Root>
                  <textarea
                    className="inline-block h-96 w-full border border-blue7
                    bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
                    // type="text"
                    id="firstName"
                    // defaultValue="select"
                    defaultValue={inputs.overview}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        overview: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 grid min-h-88vh grid-rows-4 space-y-2">
              <div className="row-span-2 border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                <h1 className="text-center text-lg font-extralight">
                  Location
                </h1>

                <div className="  mx-4 mb-2 flex min-w-full flex-col pr-8 text-sm">
                  <Label.Root className="px-0.5" htmlFor="firstName">
                    Address
                  </Label.Root>
                  <input
                    className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                    type="text"
                    id="firstName"
                    defaultValue={inputs.address}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex-col-1 flex max-w-fit text-sm">
                  <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <Label.Root className="px-0.5" htmlFor="firstName">
                      City
                    </Label.Root>
                    <input
                      className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                      type="text"
                      id="firstName"
                      defaultValue={inputs.city}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                    />                   
                  </div>
                  <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <Label.Root className="px-0.5" htmlFor="firstName">
                      Postal Code
                    </Label.Root>
                    <input
                      className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                      type="text"
                      id="firstName"
                      defaultValue={inputs.postalCode}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          postalCode: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="mx-4 mb-2 flex w-full flex-col  pt-2 pr-6 text-sm ">
                  <Label.Root className="px-0.5" htmlFor="firstName">
                    Describe Location
                  </Label.Root>
                  <textarea
                    className="inline-block h-32 w-full border
                    border-blue7 bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
                    // type="text"
                    id="firstName"
                    defaultValue={inputs.location}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="row-span-2 border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                <h1 className="text-center text-lg font-extralight">
                  Compensation
                </h1>

                <div className=" max-w-fit text-sm">
                  <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <Label.Root className="px-0.5" htmlFor="firstName">
                      Hourly Rate
                    </Label.Root>
                    <input
                      className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                      id="firstName"
                      type="number"
                      defaultValue={inputs.hourlyRate}
                      onChange={(e) => {
                        setInputs((prev) => ({
                          ...prev,
                          hourlyRate: parseFloat(e.target.value),
                          totalCompensation:
                            parseFloat(e.target.value) * prev.totalHours,
                        }));
                      }}
                    />
                  </div>
                  {/* <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <Label.Root className="px-0.5" htmlFor="firstName">
                      Number of Hours
                    </Label.Root>
                    <input
                      className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                      id="firstName"
                      type="number"
                      defaultValue={inputs.totalHours}
                      // onChange={(e) => {
                      //   setInputs((prev) => ({
                      //     ...prev,
                      //     totalHours: parseFloat(e.target.value),
                      //     totalCompensation:
                      //       prev.hourlyRate * parseFloat(e.target.value),
                      //   }));
                      // }}
                    />
                  </div> */}
                </div>
                <div className="  mx-4 mb-2 flex min-w-full flex-col pr-8 text-sm">
                  <Label.Root className="px-0.5" htmlFor="firstName">
                    Total: ${totalComp}
                  </Label.Root>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      publish();
                    }}
                    className="cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
            dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      {/* </div>  */}

      {/* </div> */}
    </>
  );
};

export default CreateSession;
