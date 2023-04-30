import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import AppliedEngine from "@/components/caregiver/appliedEngine";
import Header from "@/components/layout/header";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const Applied: NextPage = () => {
  //TODO: combine all these pages into caregiver/sessions
  const { data: session } = useSession();
  const router = useRouter();

  const { data, isLoading } =
  trpc.careSessionAPIs.readAllAppliedPotentialSessionsByUser.useQuery();


  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  return (
    <>
      <Head>
        <title>Applied</title>
      </Head>
      <Header />
      <div>
        {session && (
          <>



<div className="grid min-h-screen grid-cols-1 font-roboto">
              <div>
                <p className="py-2 px-4">
                  This page displays sessions you applied to. If the patient accepts you as their caregiver, the session will move to the scheduled page.
                   If the patient accepts a different caregiver or the session date passes, the session will be visible on your history page.
                </p>
              </div>
              <div className="max-h-screen overflow-scroll ">
                <div className="mt-4">
                  <ul>
                    {data
                      ?.filter((data) => {
                        const { sessionMonth, sessionDay, sessionYear } = data;
                        if (sessionYear && sessionYear < currentYear) {
                          return false;
                        }
                        if (sessionYear && sessionYear > currentYear) {
                          return true;
                        }
                        if (sessionMonth && sessionMonth < currentMonth) {
                          return false;
                        }
                        if (sessionMonth && sessionMonth > currentMonth) {
                          return true;
                        }
                        if (sessionDay && sessionDay < currentDay) {
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
                            className="mx-4 mb-4 items-center justify-around border px-2"
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
                                  {sessionMonth} / {sessionDay} / {sessionYear}
                                </p>
                                <p className="">
                                  <span className="">Session Start:&nbsp;</span>
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
                                  <span className="">Postal Code:&nbsp;</span>
                                  {postalCode}
                                </p>
                              </div>
                            </div>
                            <p className="">
                              <span className="">Session Overview:&nbsp;</span>
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
                                  <span className=" ">Duration:&nbsp;</span>
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
                                  <span className="">
                                    Total Compensation:&nbsp;
                                  </span>
                                  ${totalCompensation}
                                </p>
                              </div>
                            </div>
                            <div className="my-4 flex items-center justify-center">
                              <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    router.push(`/careSession/${data.slug}`);
                                  }}
                                  className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue2"
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
            </div>





            {/* <div className="mx-4 grid min-h-88vh grid-cols-2 gap-x-1 bg-blue1 dark:bg-darkBlue1">
              <AppliedEngine />
            </div> */}
          </>
        )}
        {!session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1">
                  <LoginForm />
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default Applied;
