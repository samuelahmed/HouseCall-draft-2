import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { useState } from "react";
import type { CareSession } from "@prisma/client";
import { useRouter } from "next/router";
import * as Label from "@radix-ui/react-label";
import DateEngine from "../dateSelect/dateEngine";
import { OverlayContainer } from "@react-aria/overlays";
import { DatePicker } from "../dateSelect/datePicker";
import { today, getLocalTimeZone } from "@internationalized/date";
import TimeEngine from "../dateSelect/timeEngine";

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

  const [inputs, setInputs] = useState({
    name: data?.username || "",
    address: data?.address || "",
    medicalNotes: "",
    overview: "",
    title: "",
    hourlyRate: 20,
    totalHours: 1,
    totalCompensation: 20,
    acceptedCaregiverId: "",
    careSessionStatus: "",
  });

  const totalComp = inputs.totalHours * inputs.hourlyRate;

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
  console.log(inputs.title);
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
                  <Label.Root className="px-0.5" htmlFor="firstName">
                    Date
                  </Label.Root>
                  <input
                    className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                    type="text"
                    id="firstName"
                    defaultValue=""
                  />
                </div>

                <div className="">

                  <DateEngine />
                </div>

                <div className="">

                  <TimeEngine />
                </div>

                <div className="flex-col-1 flex max-w-fit text-sm">
                  {/* <OverlayContainer> */}

                  <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <Label.Root className="px-0.5" htmlFor="firstName">
                      Start Time
                    </Label.Root>
                    {/* <DatePicker
                      className="fixed min-h-screen"
                      label="Appointment date"
                      minValue={today(getLocalTimeZone())}
                    /> */}

                    <input
                      className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                      type="text"
                      id="firstName"
                      defaultValue=""
                    />
                  </div>
                  {/* </OverlayContainer> */}


                  <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <Label.Root className="px-0.5" htmlFor="firstName">
                      End Time
                    </Label.Root>
                    <input
                      className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                      type="text"
                      id="firstName"
                      defaultValue=""
                    />
                  </div>
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
                    defaultValue="select"
                    value={inputs.overview}
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
                    defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                    defaultValue=""
                    value={inputs.medicalNotes}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        medicalNotes: e.target.value,
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
                      value={inputs.hourlyRate}
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
                  <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <Label.Root className="px-0.5" htmlFor="firstName">
                      Number of Hours
                    </Label.Root>
                    <input
                      className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
                      id="firstName"
                      type="number"
                      value={inputs.totalHours}
                      onChange={(e) => {
                        setInputs((prev) => ({
                          ...prev,
                          totalHours: parseFloat(e.target.value),
                          totalCompensation:
                            prev.hourlyRate * parseFloat(e.target.value),
                        }));
                      }}
                    />
                  </div>
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
          <div></div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default CreateSession;
