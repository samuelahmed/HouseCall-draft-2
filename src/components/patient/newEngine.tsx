import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const NewEngine = () => {
  const router = useRouter();
  const [rightCard, setRightCard] = useState(1);
  const { data, isLoading } =
    trpc.careSessionAPIs.readAllNewSessionsByUser.useQuery();

  const [inputs, setInputs] = useState({
    title: "",
    id: "",
    name: "",
    address: "",
    overview: "",
    sessionType: "",
    hourlyRate: 0,
    totalHours: 0,
    totalCompensation: 0,
    careSessionStatus: "",
    city: "",
    postalCode: "",
    sessionStartHour: 0,
    sessionStartMinute: 0,
    sessionEndHour: 0,
    sessionEndMinute: 0,
    sessionMonth: 0,
    sessionDay: 0,
    sessionYear: 0,
  });

  const selectedSession =
    trpc.careSessionAPIs.readOneSessionBySessionId.useQuery({
      id: inputs?.id || (data?.[data?.length - 1]?.id ?? "0"),
    });

  const selectedStartTimeHour = selectedSession?.data?.sessionStartHour || 0;
  const selectedStartTimeMinute =
    selectedSession?.data?.sessionStartMinute || 0;
  const selectedEndTimeHour = selectedSession?.data?.sessionEndHour || 0;
  const selectedEndTimeMinute = selectedSession?.data?.sessionEndMinute || 0;

  let currentSessionDurationHours =
    (selectedSession?.data?.sessionEndHour || 0) -
    (selectedSession?.data?.sessionStartHour || 0);
  let currentSessionDurationMinutes =
    (selectedSession?.data?.sessionEndMinute || 0) -
    (selectedSession?.data?.sessionStartMinute || 0);
  if (currentSessionDurationMinutes < 0) {
    currentSessionDurationHours--;
    currentSessionDurationMinutes += 60;
  }

  return (
    <>
      <div
        className="col-span-2 max-h-85vh overflow-scroll border 
  border-blue6 bg-blue2 dark:border-darkBlue6 dark:bg-darkBlue2 md:col-span-1"
      >
        {/* Left Table */}
        <div
          className="mt-4"
          onClick={(e) => {
            e.preventDefault();
            setRightCard(1);
          }}
        >
          <ul>
            {data
              ?.map((data) => {
                const {
                  id,
                  title,
                  name,
                  address,
                  overview,
                  sessionType,
                  hourlyRate,
                  totalHours,
                  totalCompensation,
                  careSessionStatus,
                  city,
                  postalCode,
                  sessionStartHour,
                  sessionStartMinute,
                  sessionEndHour,
                  sessionEndMinute,
                  sessionMonth,
                  sessionDay,
                  sessionYear,
                } = data;

                const startTimeHour = sessionStartHour || 0;
                const startTimeMinute = sessionStartMinute || 0;
                const endTimeHour = sessionEndHour || 0;
                const endTimeMinute = sessionEndMinute || 0;

                let sessionDurationHours = endTimeHour - startTimeHour;
                let sessionDurationMinutes = endTimeMinute - startTimeMinute;
                if (sessionDurationMinutes < 0) {
                  sessionDurationHours--;
                  sessionDurationMinutes += 60;
                }

                console.log(currentSessionDurationHours);
                return (
                  <li
                    key={id}
                    className="mx-2 mb-2 items-center justify-around rounded-sm border
                  border-blue6 bg-blue1 px-2 text-olive12 hover:bg-blue2 dark:border-darkBlue6
                 dark:bg-darkBlue1 dark:text-darkOlive12 dark:hover:bg-darkBlue2 md:cursor-pointer"
                  >
                    <div
                      onClick={() => {
                        setInputs({
                          id: id,
                          title: title || "still loading",
                          name: name || "still loading",
                          address: address || "still loading",
                          overview: overview || "still loading",
                          sessionType: sessionType || "still loading",
                          careSessionStatus:
                            careSessionStatus || "still loading",
                          city: city || "still loading",
                          postalCode: postalCode || "still loading",
                          sessionStartHour: startTimeHour,
                          sessionStartMinute: startTimeMinute,
                          sessionEndHour: endTimeHour,
                          sessionEndMinute: endTimeMinute,
                          sessionMonth: sessionMonth || 0,
                          sessionDay: sessionDay || 0,
                          sessionYear: sessionYear || 0,

                          hourlyRate: Number(data.hourlyRate) || 0,
                          totalHours: Number(data.totalHours) || 0,
                          totalCompensation:
                            Number(data.totalCompensation) ||
                            (Number(totalHours) || 0) *
                              (Number(hourlyRate) || 0),
                        });
                      }}
                      className="mb-1 text-sm"
                    >
                      <div className="pt-2 text-center text-lg font-semibold">
                        {title}
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="col-span-1 text-left">
                          <p className="">
                            <span className=" font-semibold">Date:&nbsp;</span>
                            {sessionMonth} / {sessionDay} / {sessionYear}
                          </p>

                          <p className="">
                            <span className="font-semibold">
                              Session Start:&nbsp;
                            </span>
                            {startTimeHour > 12
                              ? startTimeHour - 12
                              : startTimeHour}
                            :
                            {startTimeMinute < 10
                              ? "0" + startTimeMinute
                              : startTimeMinute}{" "}
                            {startTimeMinute > 12 ? "PM" : "AM"}
                          </p>

                          <p className="">
                            <span className="font-semibold">
                              Session End:&nbsp;
                            </span>
                            {endTimeHour > 12 ? endTimeHour - 12 : endTimeHour}{" "}
                            :{" "}
                            {endTimeMinute < 10
                              ? "0" + endTimeMinute
                              : endTimeMinute}{" "}
                            {endTimeHour > 12 ? "PM" : "AM"}
                          </p>
                        </div>

                        <div className="col-span-1 text-left">
                          <p className="">
                            <span className="font-semibold">
                              Address:&nbsp;
                            </span>
                            {address}
                          </p>
                          <p className="">
                            <span className="font-semibold">City:&nbsp;</span>
                            {city}
                          </p>
                          <p className="">
                            <span className="font-semibold">
                              Postal Code:&nbsp;
                            </span>
                            {postalCode}
                          </p>
                        </div>
                      </div>

                      <p className="">
                        <span className=" font-semibold">
                          Session Overview:&nbsp;
                        </span>
                        <textarea
                          className="inline-block h-16 w-full border border-blue7
                           bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
                          id="firstName"
                          defaultValue={overview || ""}
                          readOnly={true}
                        />
                      </p>
                      <div className="grid grid-cols-2">
                        <div className="col-span-1 text-left">
                          <p className="">
                            <span className=" font-semibold">
                              Duration:&nbsp;
                            </span>
                            {sessionDurationHours} hours{" "}
                            {sessionDurationMinutes} minutes
                          </p>
                          <p className="">
                            <span className=" font-semibold">
                              Compensation Per Hour:&nbsp;
                            </span>
                            ${hourlyRate}
                          </p>
                        </div>

                        <div className="col-span-1 text-left">
                          <p>
                            &nbsp;
                            {/* this paragraph is just for spacing - maybe find a cleaner way */}
                          </p>
                          <p className="">
                            <span className="font-semibold">
                              Total Compensation:&nbsp;
                            </span>
                            ${totalCompensation}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 flex flex-col items-center justify-center">
                      <button
                        onClick={() => router.push(`/careSession/${data.slug}`)}
                        className="ml-3 cursor-pointer border  border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
                     dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4 md:hidden"
                      >
                        Details
                      </button>
                    </div>
                  </li>
                );
              })
              .reverse()}
          </ul>
        </div>
      </div>
      <div
        className="hidden max-h-85vh border border-blue6 bg-blue2 text-olive12 
    dark:border-darkBlue6 dark:bg-darkBlue2 dark:text-darkOlive12 md:col-span-1 md:block"
      >
        {/* Right Table */}
        <div
          className="mx-2 flex max-h-full min-w-fit  flex-col justify-between overflow-auto rounded-sm border 
    border-blue6 bg-blue1 dark:border-darkBlue6 dark:bg-darkBlue1"
        >
          <div className={rightCard === 1 ? "" : "hidden"}>
            <div className="mb-4 mr-4 ml-4 justify-center  ">
              <div className=" mx-2 my-2 border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                <h1 className="text-center text-lg font-extralight">
                  Overview
                </h1>
                <div className="mb-2 p-4 text-center text-2xl font-semibold">
                  {selectedSession?.data?.title || isLoading}
                </div>
                <div className="px-2">
                  <div className="row-span-1 grid grid-cols-2">
                    <div className="col-span-1 min-w-max">
                      <p className=" min-w-max">
                        <span className=" font-semibold">Name:&nbsp;</span>
                        {selectedSession?.data?.name}
                      </p>
                    </div>

                    <div className="col-span-1 min-w-max">
                      <p className="">
                        <span className=" font-semibold">Status:&nbsp;</span>
                        {selectedSession?.data?.careSessionStatus}
                      </p>
                    </div>
                  </div>

                  <div className="row-span-1 grid grid-cols-2">
                    <p className="">
                      <span className=" font-semibold">Date:&nbsp;</span>
                      {selectedSession?.data?.sessionMonth} /{" "}
                      {selectedSession?.data?.sessionMonth} /{" "}
                      {selectedSession?.data?.sessionYear}
                    </p>

                    <p className="">
                      <span className=" font-semibold">Duration:&nbsp;</span>
                      {currentSessionDurationHours} hours{" "}
                      {currentSessionDurationMinutes} minutes
                    </p>
                  </div>

                  <div className="row-span-1 grid grid-cols-2">
                    <p className="">
                      <span className="font-semibold">
                        Session Start:&nbsp;
                      </span>
                      {selectedStartTimeHour > 12
                        ? selectedStartTimeHour - 12
                        : selectedStartTimeHour}{" "}
                      :{" "}
                      {selectedStartTimeMinute < 10
                        ? "0" + selectedStartTimeMinute
                        : selectedStartTimeMinute}{" "}
                      {selectedStartTimeHour > 12 ? "PM" : "AM"}
                    </p>

                    <p className="">
                      <span className="font-semibold">Session End:&nbsp;</span>
                      {selectedEndTimeHour > 12
                        ? selectedEndTimeHour - 12
                        : selectedEndTimeHour}{" "}
                      :{" "}
                      {selectedEndTimeMinute < 10
                        ? "0" + selectedEndTimeMinute
                        : selectedEndTimeMinute}{" "}
                      {selectedEndTimeHour > 12 ? "PM" : "AM"}
                    </p>
                  </div>

                  <div className="mx-4 mb-2 flex w-full flex-col  pt-2 pr-6 text-sm ">
                    <p className="">
                      <span className=" font-semibold">
                        Session Overview:&nbsp;
                      </span>
                      <textarea
                        className="inline-block h-32 w-full border border-blue7
                           bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
                        // type="text"
                        id="firstName"
                        // defaultValue="select"
                        defaultValue={selectedSession?.data?.overview || ""}
                        readOnly={true}
                      />
                    </p>
                  </div>
                </div>

                {/* LOCATION  */}

                <h1 className="text-center text-lg font-extralight">
                  Location
                </h1>

                <div className="  mx-4 mb-2 flex min-w-full flex-col pr-8 text-sm">
                  <p className="">
                    <span className=" font-semibold">Address:&nbsp;</span>
                    {selectedSession?.data?.address}
                  </p>
                </div>

                <div className="flex-col-1 flex max-w-fit text-sm">
                  <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <p className="">
                      <span className=" font-semibold">
                        {/* ADD TO DB */}
                        City:&nbsp;
                      </span>
                      {selectedSession?.data?.city}
                    </p>
                  </div>
                  <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                    <p className="">
                      {/* ADD TO DB */}
                      <span className=" font-semibold">Postal Code:&nbsp;</span>
                      {selectedSession?.data?.postalCode}
                    </p>
                  </div>
                </div>

                <div className="mx-4 mb-2 flex w-full flex-col  pt-2 pr-6 text-sm ">
                  <p className="">
                    {/* ADD TO DB */}
                    <span className=" font-semibold">Location:&nbsp;</span>
                    <textarea
                      className="inline-block h-24 w-full border border-blue7
                       bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
                      // type="text"
                      id="firstName"
                      // defaultValue="select"
                      defaultValue={selectedSession?.data?.location || ""}
                      readOnly={true}
                    />
                  </p>
                </div>

                <h1 className="text-center text-lg font-extralight">
                  Compensation
                </h1>

                <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                  <p className="">
                    <span className=" font-semibold">
                      Compensation Per Hour:&nbsp;
                    </span>
                    ${selectedSession?.data?.hourlyRate}
                  </p>
                </div>
                <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                  <p className="">
                    <span className=" font-semibold">Hours:&nbsp;</span>
                    {selectedSession?.data?.totalHours}
                  </p>
                </div>
                <div className="  mx-4 mb-2 flex min-w-full flex-col pr-8 text-sm">
                  <p className="">
                    <span className=" font-semibold">Total:&nbsp;</span>$
                    {selectedSession?.data?.totalCompensation}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-center first-letter:flex">
              <button
                onClick={() =>
                  router.push(`/careSession/${selectedSession.data?.slug}`)
                }
                className="ml-3 cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
                 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewEngine;
