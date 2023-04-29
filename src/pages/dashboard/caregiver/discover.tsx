import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import Header from "@/components/layout/header";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const Discover: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [rightCard, setRightCard] = useState(1);
  const [clickedSession, setClickedSession] = useState(-1);

  const { data, isLoading } =
    trpc.careSessionAPIs.readAllSessionsWithStatusNew.useQuery();

  const [inputs, setInputs] = useState({
    title: "",
    id: "",
    name: "",
    city: "",
    overview: "",
    sessionType: "",
    hourlyRate: 0,
    totalHours: 0,
    totalCompensation: 0,
    careSessionStatus: "",

    //new inputs

    sessionMonth: 0,
    sessionDay: 0,
    sessionYear: 0,

    startTimeHour: 0,
    startTimeMinute: 0,
    endTimeHour: 0,
    endTimeMinute: 0,

    createdAt: new Date(),

    // startTimeHour: "",
    // sessionEnd: "",
  });

  const selectedSession =
    trpc.careSessionAPIs.readOneSessionBySessionId.useQuery({
      id: inputs?.id || (data?.[data?.length - 1]?.id ?? "0"),
    });

  return (
    <>
      <Head>
        <title>Discover</title>
      </Head>
      <Header />
      <div>
        {session && (
          <div className="font-roboto">
            <div>
              <p className="py-2 px-4">
                Use this page to discover new sessions created by nearby
                patients. When you select a session, you can click details to
                get more information and apply to be the caregiver. When you
                apply a patient will have the option to message and accept you.
              </p>
            </div>
            <div className="grid min-h-screen grid-cols-1 md:grid-cols-2   ">
              <div className="col-span-1 max-h-screen overflow-scroll">
                <div
                  className="mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setRightCard(1);
                  }}
                >
                  <ul>
                    {data
                      ?.map((data, clickedSessionTriggered) => {
                        const {
                          id,
                          title,
                          name,
                          city,
                          overview,
                          sessionType,
                          hourlyRate,
                          totalHours,
                          totalCompensation,
                          careSessionStatus,

                          //new data
                          sessionMonth,
                          sessionDay,
                          sessionYear,
                          sessionStartHour,
                          sessionStartMinute,
                          sessionEndHour,
                          sessionEndMinute,
                          createdAt,
                        } = data;
                        const startTimeHour = sessionStartHour || 0;
                        const startTimeMinute = sessionStartMinute || 0;
                        const endTimeHour = sessionEndHour || 0;
                        const endTimeMinute = sessionEndMinute || 0;
                        let sessionDurationHours = endTimeHour - startTimeHour;
                        let sessionDurationMinutes =
                          endTimeMinute - startTimeMinute;
                        if (sessionDurationMinutes < 0) {
                          sessionDurationHours--;
                          sessionDurationMinutes += 60;
                        }

                        return (
                          <li
                            key={id}
                            //re-add color when hoever & active
                            className={
                              clickedSession === clickedSessionTriggered
                                ? "mx-2 mb-2 border bg-blue4 px-2 dark:bg-darkBlue4 md:cursor-pointer "
                                : "mx-2 mb-2 border px-2 hover:bg-blue4 dark:hover:bg-darkBlue4 md:cursor-pointer"
                            }
                          >
                            <div
                              className=""
                              onClick={() => {
                                setClickedSession(clickedSessionTriggered);

                                setInputs({
                                  id: id,
                                  title: title || "still loading",
                                  name: name || "still loading",
                                  city: city || "still loading",
                                  overview: overview || "still loading",
                                  sessionType: sessionType || "still loading",
                                  careSessionStatus:
                                    careSessionStatus || "still loading",
                                  hourlyRate: Number(data.hourlyRate) || 0,
                                  totalHours: Number(data.totalHours) || 0,
                                  totalCompensation:
                                    Number(data.totalCompensation) ||
                                    (Number(totalHours) || 0) *
                                      (Number(hourlyRate) || 0),

                                  //new data
                                  sessionDay: sessionDay || 0,
                                  sessionMonth: sessionMonth || 0,
                                  sessionYear: sessionYear || 0,
                                  startTimeHour: sessionStartHour || 0,
                                  startTimeMinute: sessionStartMinute || 0,
                                  endTimeHour: sessionEndHour || 0,
                                  endTimeMinute: sessionEndMinute || 0,
                                  createdAt: createdAt || new Date(),
                                });
                              }}
                            >
                              <div className="pt-2 text-center text-lg font-semibold">
                                {title}
                              </div>
                              <div className="grid grid-cols-2">
                                <div className="col-span-1">
                                  <p className="">
                                    <p className="">
                                      <span className="">Status:&nbsp;</span>
                                      {careSessionStatus}
                                    </p>
                                    <span className="">
                                      Session Date:&nbsp;
                                    </span>
                                    {sessionMonth} / {sessionDay} /{" "}
                                    {sessionYear}
                                  </p>
                                  <p className="">
                                    <span className="">
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
                                    <span className="">Session End:&nbsp;</span>
                                    {endTimeHour > 12
                                      ? endTimeHour - 12
                                      : endTimeHour}
                                    :
                                    {endTimeMinute < 10
                                      ? "0" + endTimeMinute
                                      : endTimeMinute}{" "}
                                    {endTimeHour > 12 ? "PM" : "AM"}
                                  </p>
                                </div>

                                <div className="col-span-1">
                                  <p className="">
                                    <span className="">City:&nbsp;</span>
                                    {city}
                                  </p>
                                  <p className="">
                                    <span className=" ">Duration:&nbsp;</span>
                                    {sessionDurationHours} hours{" "}
                                    {sessionDurationMinutes} minutes
                                  </p>
                                  <p className="">
                                    <span className="">
                                      Total Compensation:&nbsp;
                                    </span>
                                    ${totalCompensation}
                                  </p>
                                </div>
                              </div>

                              <p className="">
                                <span className="">Overview:&nbsp;</span>
                                {overview}
                              </p>
                            </div>

                            {/* update to new button style */}
                            <div className="mb-4 flex flex-col items-center justify-center">
                              <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue2 md:hidden">
                                <button
                                  onClick={() =>
                                    router.push(`/careSession/${data.slug}`)
                                  }
                                  className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue2 md:hidden"
                                >
                                  Details
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })
                      .reverse()}
                  </ul>
                </div>
              </div>

              <div className="col-span-1 mr-2 hidden md:block">
                <div className="mt-2  min-h-full justify-center border">
                  <div className={rightCard === 1 ? "" : "hidden"}>
                    <div className="text-center text-2xl  ">
                      {selectedSession?.data?.title || isLoading}
                    </div>

                    {/* INTERNAL BOX */}
                    <div className="grid grid-cols-2 justify-center border">
                      {/* TOP LEFT */}
                      <div className="col-span-1 border bg-yellow9 px-2 py-2">
                        {/* STATUS */}
                        <p className="">
                          <span className="">Status:&nbsp;</span>
                          {selectedSession?.data?.careSessionStatus ||
                            isLoading}
                        </p>
                        {/* NAME */}
                        <p className="">
                          <span className="">Name:&nbsp;</span>
                          {selectedSession?.data?.name || isLoading}
                        </p>
                        {/* DATE */}
                        <p className="">
                          <span className="">Date:&nbsp;</span>
                          {selectedSession?.data?.sessionDay ||
                            isLoading} /{" "}
                          {selectedSession?.data?.sessionMonth || isLoading} /{" "}
                          {selectedSession?.data?.sessionYear || isLoading}
                        </p>
                      </div>

                      {/* TOP RIGHT */}
                      <div className="col-span-1 border bg-blue5 px-2 py-2">
                        {/* SESSION START  */}
                        {selectedSession?.data?.sessionStartHour !== null &&
                          selectedSession?.data?.sessionStartHour !==
                            undefined &&
                          selectedSession?.data?.sessionStartMinute !== null &&
                          selectedSession?.data?.sessionStartMinute !==
                            undefined && (
                            <p className="">
                              <span className="">Session Start:&nbsp;</span>
                              {selectedSession?.data?.sessionStartHour > 12
                                ? selectedSession?.data?.sessionStartHour - 12
                                : selectedSession?.data?.sessionStartHour}
                              :
                              {selectedSession?.data?.sessionStartMinute < 10
                                ? "0" +
                                  selectedSession?.data?.sessionStartMinute
                                : selectedSession?.data
                                    ?.sessionStartMinute}{" "}
                              {selectedSession?.data?.sessionStartMinute > 12
                                ? "PM"
                                : "AM"}
                            </p>
                          )}
                        {/* SESSION END  */}
                        {selectedSession?.data?.sessionEndHour !== null &&
                          selectedSession?.data?.sessionEndHour !== undefined &&
                          selectedSession?.data?.sessionEndMinute !== null &&
                          selectedSession?.data?.sessionEndMinute !==
                            undefined && (
                            <p className="">
                              <span className="">Session End:&nbsp;</span>
                              {selectedSession?.data?.sessionEndHour > 12
                                ? selectedSession?.data?.sessionEndHour - 12
                                : selectedSession?.data?.sessionEndHour}
                              :
                              {selectedSession?.data?.sessionEndMinute < 10
                                ? "0" + selectedSession?.data?.sessionEndMinute
                                : selectedSession?.data?.sessionEndMinute}{" "}
                              {selectedSession?.data?.sessionEndHour > 12
                                ? "PM"
                                : "AM"}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 justify-center border">
                      {/* MIDDLE BOX FOR OVERVIEW */}

                      <p className="">
                        <span className="">Overview:&nbsp;</span>
                        <textarea
                          className="inline-block h-16 w-full border px-1 py-1 align-text-top focus:outline-none dark:bg-darkBg "
                          id="firstName"
                          defaultValue={selectedSession?.data?.overview || ""}
                          readOnly={true}
                        />
                      </p>
                    </div>

                    {/* MIDDLE BOX SPLIT */}
                    <div className="grid grid-cols-2 justify-center border">
                      <div className="col-span-1 border bg-yellow9 px-2 py-2">
                        {/* MIDDLE LEFT */}
                        ADDRESS AND LOCATION
                      </div>

                      <div className="col-span-1 border bg-blue3 px-2 py-2">
                        {/* MIDDLE RIGHT */}
                        CITY AND POSTAL CODE
                      </div>
                    </div>

                    <div className="grid grid-cols-1 justify-center border">
                      {/* MIDDLE BOX FOR LOCATION */}
                      <p className="">
                        <span className="">Location:&nbsp;</span>
                        <textarea
                          className="inline-block h-16 w-full border px-1 py-1 align-text-top focus:outline-none dark:bg-darkBg "
                          id="firstName"
                          defaultValue={selectedSession?.data?.location || ""}
                          readOnly={true}
                        />
                      </p>
                    </div>

                    <div className="grid grid-cols-2 justify-center border">
                      <div className="col-span-1 border bg-yellow9 px-2 py-2">
                        {/* BOTTOM LEFT */}
                        COMPENSATION
                      </div>

                      <div className="col-span-1 border bg-blue3 px-2 py-2">
                        {/* BOTTOM RIGHT */}
                        TOTAL
                      </div>
                    </div>

                    {/* SESSION DURATION  */}
                    <p className="">
                      {selectedSession?.data?.sessionEndHour !== null &&
                        selectedSession?.data?.sessionEndHour !== undefined &&
                        selectedSession?.data?.sessionEndMinute !== null &&
                        selectedSession?.data?.sessionEndMinute !== undefined &&
                        selectedSession?.data?.sessionStartHour !== null &&
                        selectedSession?.data?.sessionStartHour !== undefined &&
                        selectedSession?.data?.sessionStartMinute !== null &&
                        selectedSession?.data?.sessionStartMinute !==
                          undefined && (
                          <p>
                            <span className=" ">Duration:&nbsp;</span>
                            {selectedSession?.data?.sessionEndHour -
                              selectedSession?.data?.sessionStartHour}{" "}
                            hours{" "}
                            {selectedSession?.data?.sessionEndMinute -
                              selectedSession?.data?.sessionStartMinute}{" "}
                            minutes{" "}
                          </p>
                        )}
                    </p>

                    {/* ADDRESS */}
                    <p className="">
                      <span className="">Address:&nbsp;</span>
                      {selectedSession?.data?.address || isLoading}
                    </p>

                    {/* CITY */}
                    <p className="">
                      <span className="">City:&nbsp;</span>
                      {selectedSession?.data?.city || isLoading}
                    </p>

                    {/* POSTAL CODE */}
                    <p className="">
                      <span className="">Postal Code:&nbsp;</span>
                      {selectedSession?.data?.postalCode || isLoading}
                    </p>

                    {/* HOURLY RATE */}
                    <p className="">
                      <span className="">Hourly Rate:&nbsp;</span>$
                      {selectedSession?.data?.hourlyRate || isLoading}
                    </p>

                    {/* HOURS */}
                    <p className="">
                      <span className="">Hours:&nbsp;</span>
                      {selectedSession?.data?.totalHours || isLoading}
                    </p>

                    {/* TOTAL COMPENSATION */}
                    <p className="">
                      <span className="">Total:&nbsp;</span>$
                      {selectedSession?.data?.totalCompensation || isLoading}
                    </p>

                    {/* SESSION CREATED */}
                    <p className="text-sm">
                      <span className="">Session Created:&nbsp;</span>
                      {selectedSession?.data?.createdAt.toDateString() ||
                        isLoading}
                    </p>

                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue2">
                        <button
                          onClick={() =>
                            router.push(
                              `/careSession/${selectedSession.data?.slug}`
                            )
                          }
                          className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue2"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!session && (
          <>
            <LoginForm />
          </>
        )}
      </div>
    </>
  );
};

export default Discover;
