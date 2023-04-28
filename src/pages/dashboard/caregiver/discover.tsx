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
          <>
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
                      ?.map((data) => {
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
                            className="mx-2 mb-2 border bg-yellow9 px-2 md:cursor-pointer"
                          >
                            <div
                              className=""
                              onClick={() => {
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
                                    <span className="">Date:&nbsp;</span>
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
                              <button
                                onClick={() =>
                                  router.push(`/careSession/${data.slug}`)
                                }
                                className="ml-3 cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4 md:hidden"
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

              <div className="col-span-1 hidden md:block">
                <div className="mt-2 flex min-h-full flex-col justify-between border">
                  <div className={rightCard === 1 ? "" : "hidden"}>
                    <div className="mb-4 mr-4 ml-4 justify-center ">
                      <div className="mb-2 p-4 text-center text-2xl ">
                        {selectedSession?.data?.title || isLoading}
                      </div>
                      <div className="">
                        <p className="">
                          <span className="">Status:&nbsp;</span>
                          {selectedSession?.data?.careSessionStatus ||
                            isLoading}
                        </p>
                        <p className="">
                          <span className="">Name:&nbsp;</span>
                          {selectedSession?.data?.name || isLoading}
                        </p>
                        <p className="">
                          <span className="">Address:&nbsp;</span>
                          {selectedSession?.data?.address || isLoading}
                        </p>
                        <p className="">
                          <span className="">Medical Notes:&nbsp;</span>
                          {selectedSession?.data?.medicalNotes || isLoading}
                        </p>
                        <p className="">
                          <span className="">Overview:&nbsp;</span>
                          {selectedSession?.data?.overview || isLoading}
                        </p>
                        <p className="">
                          <span className="">Hourly Rate:&nbsp;</span>$
                          {selectedSession?.data?.hourlyRate || isLoading}
                        </p>
                        <p className="">
                          <span className="">Hours:&nbsp;</span>
                          {selectedSession?.data?.totalHours || isLoading}
                        </p>
                        <p className="">
                          <span className="">Total:&nbsp;</span>$
                          {selectedSession?.data?.totalCompensation ||
                            isLoading}
                        </p>
                        <p className="">
                          <span className="">Date:&nbsp;</span>
                          {selectedSession?.data?.sessionDay ||
                            isLoading} /{" "}
                          {selectedSession?.data?.sessionMonth || isLoading} /{" "}
                          {selectedSession?.data?.sessionYear || isLoading}
                        </p>
                        <div className="flex flex-col items-center justify-center">
                          <button
                            onClick={() =>
                              router.push(
                                `/careSession/${selectedSession.data?.slug}`
                              )
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
                </div>
              </div>
            </div>
          </>
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
