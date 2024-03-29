import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import { OverlayContainer } from "@react-aria/overlays";
import Header from "@/components/layout/header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { today, getLocalTimeZone } from "@internationalized/date";
import { ClockIcon } from "@heroicons/react/outline";
import { DatePicker } from "@/components/dateSelect/datePicker";
import * as Label from "@radix-ui/react-label";
import { TimeField } from "@/components/dateSelect/timeField";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Create: NextPage = () => {
  const { data: session } = useSession();
  const [startTimeSelect, setStartTimeSelect] = useState(false);
  const [endTimeSelect, setEndTimeSelect] = useState(false);
  const [dateValue, setDateValue] = useState(today(getLocalTimeZone()));
  const router = useRouter();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();

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

  const [inputs, setInputs] = useState({
    name: data?.username || "",
    address: data?.address || "",
    medicalNotes: "",
    overview: "",
    title: "Select Session Type",
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
    slug: Math.random().toString(36).substring(2, 8),
  });

  const { mutate } = trpc.careSessionAPIs.createOneCareSession.useMutation({
    onSuccess() {
      alert("Session successfully created!");
    },
    onError() {
      alert("Error, there was an error.");
    },
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
    if (inputs.title === "Select Session Type") {
      alert("Error: To create a session, you must select a session type");
    } else {
      mutate(inputs);
      router.push(`/careSession/${inputs.slug}`);
    }
  };

  return (
    <>
      <Head>
        <title>Create</title>
      </Head>
      <Header />
      <div>
        {session && (
          <>
            <OverlayContainer>
              <div
                onClick={() => {
                  if (startTimeSelect) {
                    setStartTimeSelect(false);
                  }
                  if (endTimeSelect) {
                    setEndTimeSelect(false);
                  }
                }}
                className="grid min-h-screen grid-cols-1 font-roboto md:grid-cols-2"
              >
                <div className="col-span-1 px-4 py-4">
                  <p className="py-2 px-4">
                    Fill out the information on this page and click submit to
                    create your session. Caregivers in your area can discover
                    and apply to your session. When a caregiver applies, you can
                    chat with them and decide if they are a good fit for your
                    needs.
                  </p>
                  <h1 className="py-2 text-center text-xl">Overview</h1>
                  <div className="grid grid-cols-2">
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
                          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                        >
                          <option>Select Session Type</option>
                          <option>Mobility Support </option>
                          <option>Personal Care</option>
                          <option>Home Care</option>
                          <option>Transportation</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Label.Root
                        className="px-0.5"
                        htmlFor="Session Start Time"
                      >
                        Session Start
                      </Label.Root>
                      {startTimeSelect && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <div className="absolute flex flex-row items-center space-x-1 border bg-white px-2 py-2 dark:bg-darkBg">
                            <p className="text-sm">Hour</p>
                            <select
                              value={startTime.hour}
                              onChange={(e) => {
                                setStartTime((prev) => ({
                                  ...prev,
                                  hour: parseInt(e.target.value),
                                }));
                              }}
                              className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                            >
                              {Array.from({ length: 24 }, (_, i) => i).map(
                                (hour) => (
                                  <option key={hour}>{hour}</option>
                                )
                              )}
                            </select>
                            <p className="text-sm">Minute</p>
                            <select
                              value={startTime.minute}
                              onChange={(e) => {
                                setStartTime((prev) => ({
                                  ...prev,
                                  minute: parseInt(e.target.value),
                                }));
                              }}
                              className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                            >
                              {Array.from({ length: 60 }, (_, i) => i).map(
                                (minute) => (
                                  <option key={minute}>{minute}</option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-row items-center">
                        <TimeField value={startTime} onChange={setStartTime} />
                        <ClockIcon
                          onClick={() => {
                            setStartTimeSelect(true);
                          }}
                          className="ml-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="mx-4 mb-2 flex max-w-fit flex-col">
                        <Label.Root className="px-0.5" htmlFor="Name">
                          Name
                        </Label.Root>
                        <input
                          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                          type="text"
                          defaultValue={
                            data && data?.username ? data?.username : ""
                          }
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Label.Root className="px-0.5" htmlFor="Session End Time">
                        Session End
                      </Label.Root>
                      {endTimeSelect && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <div className="absolute flex flex-row items-center space-x-1 border bg-white px-2 py-2 dark:bg-darkBg">
                            <p className="text-sm">Hour</p>
                            <select
                              value={endTime.hour}
                              onChange={(e) => {
                                setEndTime((prev) => ({
                                  ...prev,
                                  hour: parseInt(e.target.value),
                                }));
                              }}
                              className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                            >
                              {Array.from({ length: 24 }, (_, i) => i).map(
                                (hour) => (
                                  <option key={hour}>{hour}</option>
                                )
                              )}
                            </select>
                            <p className="text-sm">Minute</p>
                            <select
                              value={endTime.minute}
                              onChange={(e) => {
                                setEndTime((prev) => ({
                                  ...prev,
                                  minute: parseInt(e.target.value),
                                }));
                              }}
                              className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                            >
                              {Array.from({ length: 60 }, (_, i) => i).map(
                                (minute) => (
                                  <option key={minute}>{minute}</option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-row items-center">
                        <TimeField value={endTime} onChange={setEndTime} />
                        <ClockIcon
                          onClick={() => {
                            setEndTimeSelect(true);
                          }}
                          className="ml-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="mx-4 mb-2 flex flex-col">
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
                    <div className="col-span-1"></div>
                  </div>
                  <div className="flex flex-col px-4 py-2">
                    <Label.Root
                      className="px-0.5"
                      htmlFor="Session Description"
                    >
                      Describe Desired Session
                    </Label.Root>
                    <textarea
                      className="inline-block h-64 w-full border px-1 py-1 align-text-top focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                <div className="col-span-1 px-4 py-4 ">
                  <h1 className="py-2 text-center text-xl">Location</h1>
                  <div className="flex min-w-full max-w-fit flex-col px-4 pb-2">
                    <Label.Root className="px-0.5" htmlFor="Address">
                      Address
                    </Label.Root>
                    <input
                      className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                      type="text"
                      defaultValue={inputs.address}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 mx-4 mb-2">
                      <Label.Root className="" htmlFor="City">
                        City
                      </Label.Root>
                      <input
                        className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                        type="text"
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
                      <Label.Root className="px-0.5" htmlFor="Postal Code">
                        Postal Code
                      </Label.Root>
                      <input
                        className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                        type="text"
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
                  <div className="flex flex-col px-4 py-2">
                    <Label.Root className="" htmlFor="Describe Location">
                      Describe Location
                    </Label.Root>
                    <textarea
                      className="h-18 inline-block w-full border px-1 py-1 align-text-top focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 mx-4 mb-2">
                      <Label.Root className="px-0.5" htmlFor="Hourly Rate">
                        Hourly Rate
                      </Label.Root>
                      <input
                        className="block border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                    <div className="flex flex-col px-4 pt-6 align-bottom">
                      <Label.Root className="" htmlFor="Session Duration">
                        {inputs.totalHours >= 0 && (
                          <div>Duration: {inputs.totalHours} hours</div>
                        )}
                        {inputs.totalHours < 0 && (
                          <div className="text-sm text-red11">
                            Session must end after start time.
                          </div>
                        )}
                      </Label.Root>
                      {totalComp >= 0 && (
                        <Label.Root className="" htmlFor="Total Cost">
                          Total: ${totalComp}
                        </Label.Root>
                      )}
                    </div>
                  </div>
                  <div className="my-16 flex items-center justify-center">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="default" size="lg">
                          Submit
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you certain?</AlertDialogTitle>
                          <AlertDialogDescription>
                            If you select submit your session will be created
                            and caregivers will be able to apply.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              publish();
                            }}
                          >
                            Submit
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </OverlayContainer>
          </>
        )}
        {!session && (
          <>
            <div className="flex min-h-screen flex-col items-center justify-center">
              <h1 className="py-10 text-center font-robotoSlab text-3xl font-bold">
                Login to your Account
              </h1>
              <LoginForm />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Create;
