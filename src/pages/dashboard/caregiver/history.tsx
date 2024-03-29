import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import Header from "@/components/layout/header";
import { trpc } from "@/utils/trpc";
import NoSessionFound from "@/components/layout/noSessionFound";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const History: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: readAllScheduledSessionsByUser, isLoading } =
    trpc.careSessionAPIs.readAllScheduledSessionsByUser.useQuery();
  const { data: readAllCompletedSessionsByUser } =
    trpc.careSessionAPIs.readAllCompletedSessionsByUser.useQuery();
  const { data: readAllCanceledSessionsByUser } =
    trpc.careSessionAPIs.readAllCanceledSessionsByUser.useQuery();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <Header />
      <div>
        {session && (
          <>
            <div>
              <p className="py-2 px-4 font-roboto">
                This page provides a history of all your sessions. Note that
                sessions which you applied to but were not selected for will not
                appear here.
              </p>
            </div>
            {readAllScheduledSessionsByUser?.length === 0 &&
              readAllCompletedSessionsByUser?.length === 0 &&
              readAllCanceledSessionsByUser?.length === 0 && (
                <div className="mt-20">
                  <NoSessionFound />
                </div>
              )}
            <div className="grid min-h-screen grid-cols-1 font-roboto md:grid-cols-3 ">
              <div className="col-span-1">
                <div className="px-4">
                  {readAllScheduledSessionsByUser?.length !== 0 && (
                    <>
                      <h1 className="text-center text-xl">Upcoming Sessions</h1>
                      <div className="mt-4 max-h-screen overflow-scroll">
                        <ul>
                          {readAllScheduledSessionsByUser
                            ?.filter((data) => {
                              const { sessionMonth, sessionDay, sessionYear } =
                                data;
                              //year
                              if (sessionYear && sessionYear < currentYear) {
                                return false;
                              }
                              //month
                              if (
                                sessionYear &&
                                sessionYear === currentYear &&
                                sessionMonth &&
                                sessionMonth < currentMonth
                              ) {
                                return false;
                              }
                              //day
                              if (
                                sessionYear &&
                                sessionYear === currentYear &&
                                sessionMonth &&
                                sessionMonth === currentMonth &&
                                sessionDay &&
                                sessionDay < currentDay
                              ) {
                                return false;
                              }
                              return true;
                            })
                            ?.sort((a, b) => {
                              const aDate = new Date(
                                a.sessionYear || 0,
                                a.sessionMonth || 0,
                                a.sessionDay || 0
                              );
                              const bDate = new Date(
                                b.sessionYear || 0,
                                b.sessionMonth || 0,
                                b.sessionDay || 0
                              );
                              return bDate.getTime() - aDate.getTime();
                            })
                            ?.map((data) => {
                              const {
                                id,
                                title,
                                address,
                                overview,
                                hourlyRate,
                                totalCompensation,
                                city,
                                postalCode,
                                sessionStartHour,
                                sessionStartMinute,
                                sessionEndHour,
                                sessionEndMinute,
                                sessionMonth,
                                sessionDay,
                                sessionYear,
                                careSessionStatus,
                              } = data;
                              const startTimeHour = sessionStartHour || 0;
                              const startTimeMinute = sessionStartMinute || 0;
                              const endTimeHour = sessionEndHour || 0;
                              const endTimeMinute = sessionEndMinute || 0;
                              let sessionDurationHours =
                                endTimeHour - startTimeHour;
                              let sessionDurationMinutes =
                                endTimeMinute - startTimeMinute;
                              if (sessionDurationMinutes < 0) {
                                sessionDurationHours--;
                                sessionDurationMinutes += 60;
                              }
                              return (
                                <li
                                  key={id}
                                  className="mx-8 mb-4 items-center justify-around border-2 px-2"
                                >
                                  <div className="pt-2 text-center text-lg ">
                                    {title}
                                  </div>
                                  <div className="grid grid-cols-2">
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className="">Status:&nbsp;</span>
                                        {careSessionStatus}
                                      </p>
                                      <p className="">
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
                                        {startTimeHour > 12 ? "PM" : "AM"}
                                      </p>
                                      <p className="">
                                        <span className="">
                                          Session End:&nbsp;
                                        </span>
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
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className="">Address:&nbsp;</span>
                                        {address}
                                      </p>
                                      <p className="">
                                        <span className="">City:&nbsp;</span>
                                        {city}
                                      </p>
                                      <p className="">
                                        <span className="">
                                          Postal Code:&nbsp;
                                        </span>
                                        {postalCode}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="">
                                    <span className="">
                                      Session Overview:&nbsp;
                                    </span>
                                    <textarea
                                      className="inline-block h-16 w-full border px-1 py-1 align-text-top focus:outline-none dark:bg-darkBg "
                                      id="firstName"
                                      defaultValue={overview || ""}
                                      readOnly={true}
                                    />
                                  </p>
                                  <div className="grid grid-cols-2">
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className=" ">
                                          Duration:&nbsp;
                                        </span>
                                        {sessionDurationHours} hours{" "}
                                        {sessionDurationMinutes} minutes
                                      </p>
                                      <p className="">
                                        <span className=" ">
                                          Compensation Per Hour:&nbsp;
                                        </span>
                                        ${hourlyRate}
                                      </p>
                                    </div>
                                    <div className="col-span-1 text-left">
                                      <p>&nbsp;</p>
                                      <p className="">
                                        <span className="">Total:&nbsp;</span>$
                                        {totalCompensation}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="my-4 flex items-center justify-center">
                                    <Button
                                      variant="default"
                                      size="default"
                                      onClick={() => {
                                        router.push(
                                          `/careSession/${data.slug}`
                                        );
                                      }}
                                    >
                                      Details
                                    </Button>
                                  </div>
                                </li>
                              );
                            })
                            .reverse()}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div className="px-4">
                  {readAllCompletedSessionsByUser?.length !== 0 && (
                    <>
                      <h1 className="text-center text-xl">Completed</h1>
                      <div className="mt-4 max-h-screen overflow-scroll">
                        <ul>
                          {readAllCompletedSessionsByUser
                            ?.sort((a, b) => {
                              const aDate = new Date(
                                a.sessionYear || 0,
                                a.sessionMonth || 0,
                                a.sessionDay || 0
                              );
                              const bDate = new Date(
                                b.sessionYear || 0,
                                b.sessionMonth || 0,
                                b.sessionDay || 0
                              );
                              return bDate.getTime() - aDate.getTime();
                            })
                            ?.map((data) => {
                              const {
                                id,
                                title,
                                address,
                                overview,
                                hourlyRate,
                                totalCompensation,
                                city,
                                postalCode,
                                sessionStartHour,
                                sessionStartMinute,
                                sessionEndHour,
                                sessionEndMinute,
                                sessionMonth,
                                sessionDay,
                                sessionYear,
                                careSessionStatus,
                              } = data;
                              const startTimeHour = sessionStartHour || 0;
                              const startTimeMinute = sessionStartMinute || 0;
                              const endTimeHour = sessionEndHour || 0;
                              const endTimeMinute = sessionEndMinute || 0;
                              let sessionDurationHours =
                                endTimeHour - startTimeHour;
                              let sessionDurationMinutes =
                                endTimeMinute - startTimeMinute;
                              if (sessionDurationMinutes < 0) {
                                sessionDurationHours--;
                                sessionDurationMinutes += 60;
                              }
                              return (
                                <li
                                  key={id}
                                  className="mx-8 mb-4 items-center justify-around border-2 px-2"
                                >
                                  <div className="pt-2 text-center text-lg ">
                                    {title}
                                  </div>
                                  <div className="grid grid-cols-2">
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className="">Status:&nbsp;</span>
                                        {careSessionStatus}
                                      </p>
                                      <p className="">
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
                                        {startTimeHour > 12 ? "PM" : "AM"}
                                      </p>
                                      <p className="">
                                        <span className="">
                                          Session End:&nbsp;
                                        </span>
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
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className="">Address:&nbsp;</span>
                                        {address}
                                      </p>
                                      <p className="">
                                        <span className="">City:&nbsp;</span>
                                        {city}
                                      </p>
                                      <p className="">
                                        <span className="">
                                          Postal Code:&nbsp;
                                        </span>
                                        {postalCode}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="">
                                    <span className="">
                                      Session Overview:&nbsp;
                                    </span>
                                    <textarea
                                      className="inline-block h-16 w-full border px-1 py-1 align-text-top focus:outline-none dark:bg-darkBg "
                                      id="firstName"
                                      defaultValue={overview || ""}
                                      readOnly={true}
                                    />
                                  </p>
                                  <div className="grid grid-cols-2">
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className=" ">
                                          Duration:&nbsp;
                                        </span>
                                        {sessionDurationHours} hours{" "}
                                        {sessionDurationMinutes} minutes
                                      </p>
                                      <p className="">
                                        <span className=" ">
                                          Compensation Per Hour:&nbsp;
                                        </span>
                                        ${hourlyRate}
                                      </p>
                                    </div>
                                    <div className="col-span-1 text-left">
                                      <p>&nbsp;</p>
                                      <p className="">
                                        <span className="">Total:&nbsp;</span>$
                                        {totalCompensation}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="my-4 flex items-center justify-center">
                                    <Button
                                      variant="default"
                                      size="default"
                                      onClick={() => {
                                        router.push(
                                          `/careSession/${data.slug}`
                                        );
                                      }}
                                    >
                                      Details
                                    </Button>
                                  </div>
                                </li>
                              );
                            })
                            .reverse()}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div className="px-4">
                  {readAllCanceledSessionsByUser?.length !== 0 && (
                    <>
                      <h1 className="text-center text-xl">Canceled</h1>
                      <div className="mt-4 max-h-screen overflow-scroll">
                        <ul>
                          {readAllCanceledSessionsByUser
                            ?.sort((a, b) => {
                              const aDate = new Date(
                                a.sessionYear || 0,
                                a.sessionMonth || 0,
                                a.sessionDay || 0
                              );
                              const bDate = new Date(
                                b.sessionYear || 0,
                                b.sessionMonth || 0,
                                b.sessionDay || 0
                              );
                              return bDate.getTime() - aDate.getTime();
                            })
                            ?.map((data) => {
                              const {
                                id,
                                title,
                                address,
                                overview,
                                hourlyRate,
                                totalCompensation,
                                city,
                                postalCode,
                                sessionStartHour,
                                sessionStartMinute,
                                sessionEndHour,
                                sessionEndMinute,
                                sessionMonth,
                                sessionDay,
                                sessionYear,
                                careSessionStatus,
                              } = data;
                              const startTimeHour = sessionStartHour || 0;
                              const startTimeMinute = sessionStartMinute || 0;
                              const endTimeHour = sessionEndHour || 0;
                              const endTimeMinute = sessionEndMinute || 0;
                              let sessionDurationHours =
                                endTimeHour - startTimeHour;
                              let sessionDurationMinutes =
                                endTimeMinute - startTimeMinute;
                              if (sessionDurationMinutes < 0) {
                                sessionDurationHours--;
                                sessionDurationMinutes += 60;
                              }
                              return (
                                <li
                                  key={id}
                                  className="mx-8 mb-4 items-center justify-around border-2 px-2"
                                >
                                  <div className="pt-2 text-center text-lg ">
                                    {title}
                                  </div>
                                  <div className="grid grid-cols-2">
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className="">Status:&nbsp;</span>
                                        {careSessionStatus}
                                      </p>
                                      <p className="">
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
                                        {startTimeHour > 12 ? "PM" : "AM"}
                                      </p>
                                      <p className="">
                                        <span className="">
                                          Session End:&nbsp;
                                        </span>
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
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className="">Address:&nbsp;</span>
                                        {address}
                                      </p>
                                      <p className="">
                                        <span className="">City:&nbsp;</span>
                                        {city}
                                      </p>
                                      <p className="">
                                        <span className="">
                                          Postal Code:&nbsp;
                                        </span>
                                        {postalCode}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="">
                                    <span className="">
                                      Session Overview:&nbsp;
                                    </span>
                                    <textarea
                                      className="inline-block h-16 w-full border px-1 py-1 align-text-top focus:outline-none dark:bg-darkBg "
                                      id="firstName"
                                      defaultValue={overview || ""}
                                      readOnly={true}
                                    />
                                  </p>
                                  <div className="grid grid-cols-2">
                                    <div className="col-span-1 text-left">
                                      <p className="">
                                        <span className=" ">
                                          Duration:&nbsp;
                                        </span>
                                        {sessionDurationHours} hours{" "}
                                        {sessionDurationMinutes} minutes
                                      </p>
                                      <p className="">
                                        <span className=" ">
                                          Compensation Per Hour:&nbsp;
                                        </span>
                                        ${hourlyRate}
                                      </p>
                                    </div>
                                    <div className="col-span-1 text-left">
                                      <p>&nbsp;</p>
                                      <p className="">
                                        <span className="">Total:&nbsp;</span>$
                                        {totalCompensation}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="my-4 flex items-center justify-center">
                                    <Button
                                      variant="default"
                                      size="default"
                                      onClick={() => {
                                        router.push(
                                          `/careSession/${data.slug}`
                                        );
                                      }}
                                    >
                                      Details
                                    </Button>
                                  </div>
                                </li>
                              );
                            })
                            .reverse()}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
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

export default History;
