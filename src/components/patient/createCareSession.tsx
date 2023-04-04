import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { useState } from "react";
import type { CareSession } from "@prisma/client";
import { useRouter } from "next/router";
import * as Label from "@radix-ui/react-label";
import { TimeField } from "../dateSelect/timeField";
import { today, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "../dateSelect/datePicker";

const CreateSession = () => {
  const [items, setItems] = useState<CareSession[]>([]);
  const router = useRouter();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();

  const { mutate } = trpc.careSessionAPIs.createOneCareSession.useMutation({
    onSuccess(newSession) {
      alert("Meow! Session successfully created!");
      setItems((prev) => [...prev, newSession]);
      router.push("/dashboard/patient/new");
    },
  });

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
    sessionDay: dateValue.day,
    sessionMonth: dateValue.month,
    sessionYear: dateValue.year,
    sessionStartHour: startTime.hour,
    sessionStartMinute: startTime.minute,
    sessionEndHour: endTime.hour,
    sessionEndMinute: endTime.minute,
    city: "",
    postalCode: "",
    location: "",
  });

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
      <div className="grid min-h-screen grid-cols-1  font-roboto md:grid-cols-2 ">
        <div className="col-span-1  border px-4 py-4">
          <p className="py-2">
            Fill out the information on this page and click submit to create
            your session. Caregivers in your area can discover and apply to your
            session. When a caregiver applies, you can chat with them and decide
            if they are a good fit for your needs.
          </p>

          <h1 className="py-2 text-center text-xl">Overview</h1>

          <div className="grid grid-cols-2 ">
            <div className="col-span-1">
              <div className="mx-4 mb-2 flex max-w-fit flex-col">
                <Label.Root className="px-0.5" htmlFor="Session Type">
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
                  className="block w-full border px-1 py-1  focus:outline-none focus:ring-1 focus:ring-blue11 "
                >
                  <option>Mobility Support </option>
                  <option>Personal Care</option>
                  <option>Home Care</option>
                  <option>Transportation</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="col-span-1">
              {/* TODO: add a picker for time select and make focus ring work */}
              <Label.Root className="px-0.5" htmlFor="Session Start Time">
                Session Start
              </Label.Root>
              <TimeField defaultValue={startTime} onChange={setStartTime} />
            </div>

            <div className="col-span-1">
              <div className="mx-4 mb-2 flex max-w-fit flex-col">
                <Label.Root className="px-0.5" htmlFor="Name">
                  Name
                </Label.Root>
                <input
                  className="block w-full border px-1 py-1  focus:outline-none focus:ring-1 focus:ring-blue11 "
                  type="text"
                  id="firstName"
                  defaultValue={data && data?.username ? data?.username : ""}
                />
              </div>
            </div>

            <div className="col-span-1">
              <Label.Root className="px-0.5" htmlFor="Session End Time">
                Session End
              </Label.Root>
              <TimeField defaultValue={endTime} onChange={setEndTime} />
            </div>

            <div className="col-span-1">
              <div className="mx-4 mb-2 flex flex-col ">
                <Label.Root className="px-0.5" htmlFor="Session Date">
                  Session Date
                </Label.Root>

                <DatePicker
                  minValue={today(getLocalTimeZone())}
                  defaultValue={dateValue}
                  onChange={setDateValue}
                />
              </div>
            </div>

            <div className="col-span-1">
              {/* currently empty - space for new input */}
            </div>
          </div>

          <div className="flex flex-col px-4  py-2  ">
            <Label.Root className="px-0.5" htmlFor="firstName">
              Describe Desired Session
            </Label.Root>
            <textarea
              className="inline-block h-64 w-full border px-1 py-1 align-text-top focus:outline-none focus:ring-1 focus:ring-blue11"
              id="firstName"
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

        <div className="col-span-1 border px-4 py-4 ">
          <h1 className="py-2 text-center text-xl">Location</h1>
          <div className="flex min-w-full max-w-fit flex-col px-4 pb-2">
            <Label.Root className="px-0.5" htmlFor="firstName">
              Address
            </Label.Root>
            <input
              className="block w-full border px-1 py-1  focus:outline-none focus:ring-1 focus:ring-blue11 "
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
          <div className="grid grid-cols-2 ">
            <div className="col-span-1 mx-4 mb-2 ">
              <Label.Root className="" htmlFor="firstName">
                City
              </Label.Root>
              <input
                className="block w-full border px-1 py-1  focus:outline-none focus:ring-1 focus:ring-blue11 "
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
            <div className="col-span-1 mx-4 mb-2">
              <Label.Root className="px-0.5" htmlFor="firstName">
                Postal Code
              </Label.Root>
              <input
                className="block w-full border px-1 py-1  focus:outline-none focus:ring-1 focus:ring-blue11 "
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
          <div className="flex flex-col px-4  py-2  ">
            <Label.Root className="" htmlFor="firstName">
              Describe Location
            </Label.Root>
            <textarea
              className="h-18 inline-block w-full border px-1 py-1 align-text-top focus:outline-none focus:ring-1 focus:ring-blue11"
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
          <h1 className="pt-4 text-center text-xl">Compensation</h1>
          <div className="grid grid-cols-2 ">
            <div className="col-span-1 mx-4 mb-2">
              <Label.Root className="px-0.5" htmlFor="firstName">
                Hourly Rate
              </Label.Root>
              <input
                className="block  border px-1 py-1  focus:outline-none focus:ring-1 focus:ring-blue11 "
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

            <div className="px-4 pt-6  align-bottom  ">
              <Label.Root className="" htmlFor="firstName">
                Total: $ {totalComp}
              </Label.Root>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                publish();
              }}
              className="mt-8 cursor-pointer border border-solid border-blue7 bg-blue3 px-10 py-3 text-lg text-olive12 hover:border-blue8 hover:bg-blue4 
                     dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSession;
