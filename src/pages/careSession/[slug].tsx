import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import { useSession } from "next-auth/react";
import NavMenu from "@/components/layout/navMenu";
import { TimeField } from "@/components/dateSelect/timeField";
import { useEffect } from "react";

const Slug: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { data: session } = useSession();
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();

  const { data: currentSession } =
    trpc.careSessionAPIs.readOneSessionBySlug.useQuery({
      slug,
    });

  const { data: potentialCaregivers } =
    trpc.careSessionAPIs.readAllPotentialCareSessionsByCareSessionId.useQuery({
      id: currentSession?.id || "",
    });

  const { data: potentialCaregiver } =
    trpc.careSessionAPIs.readOnePotentialCaregiver.useQuery({
      caregiverId: user?.id || "",
      id: currentSession?.id || "",
    });

  const [inputs, setInputs] = useState({
    currentUserId: "",
    id: currentSession?.id || "",
    // status: "pending",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const publish = () => {
    if (user && currentSession) {
      mutate({
        caregiverId: user.id,
        careSessionId: currentSession.id,
        status: "Applied",
      });
    }
  };

  const removeCaregiver = () => {
    if (user && currentSession) {
      mutateTwo({
        caregiverId: user.id,
        careSessionId: currentSession.id,
      });
    }
  };

  const updateCareSessionStatusToApplied = () => {
    if (currentSession) {
      mutationUpdateCareSessionStatusToApplied({
        userId: currentSession.userId,
        slug: currentSession.slug,
        careSessionStatus: "Active",
        careSessionId: currentSession.id,
      });
    }
  };

  const { mutate } =
    trpc.careSessionAPIs.createOnePotentialCaregiverPage.useMutation({
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        alert("Meow! You have successfully applied to this care session.");
        // router.reload();
      },
    });

  const { mutate: mutateTwo } =
    trpc.careSessionAPIs.deleteOnePotentialCaregiver.useMutation({
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        alert("Meow! You have removed yourself from this care session.");
        // router.reload();
      },
    });

  const { mutate: mutationUpdateCareSessionStatusToApplied } =
    trpc.careSessionAPIs.updateOneCareSessionTwo.useMutation({
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        alert("Meow! The Care Session status has been automatically updated.");
        // router.reload();
      },
    });

  //Time Data
  const startTimeHour = currentSession?.sessionStartHour || 0;
  const startTimeMinute = currentSession?.sessionStartMinute || 0;
  const endTimeHour = currentSession?.sessionEndHour || 0;
  const endTimeMinute = currentSession?.sessionEndMinute || 0;
  //exact session duration - does not calculate total price
  let sessionDurationHours = endTimeHour - startTimeHour;
  let sessionDurationMinutes = endTimeMinute - startTimeMinute;
  if (sessionDurationMinutes < 0) {
    sessionDurationHours--;
    sessionDurationMinutes += 60;
  }
  //Date Data
  const sessionDay = currentSession?.sessionDay;
  const sessionMonth = currentSession?.sessionMonth;
  const sessionYear = currentSession?.sessionYear;

  return (
    <>
      <Head>
        <title>Session: {currentSession?.slug}</title>
      </Head>
      <NavLayout />
      {/***********************
       *      CAREGIVER       *
       **********************/}
      {session && user?.role === "Caregiver" && (
        <>
          <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
            <NavMenu />
            <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
              <div className=" grid min-h-88vh grid-cols-1 gap-x-1 bg-blue1 text-olive12 dark:bg-darkBlue1 dark:text-darkOlive12">
                {/* DYNAMIC PART OF DASHBOARD */}
                <div className="flex h-screen items-center justify-center  bg-blue2 dark:bg-darkBlue2">
                  <div className="h-4/6 w-1/2 rounded-sm border border-blue6 bg-blue1 dark:border-darkBlue6 dark:bg-darkBlue1">
                    <div className="mb-4 mr-4 ml-4">
                      <div className=" mb-2 mr-4 ml-4 mt-12 p-4 text-center text-xl">
                        {currentSession?.title}
                      </div>
                      <div className="text-sm">
                        <p className="">
                          <span className="font-semibold">Name:&nbsp;</span>
                          {currentSession?.name}
                        </p>
                        <p className="">
                          <span className="font-semibold">
                            Session Start Hour:&nbsp;
                          </span>
                          {currentSession?.sessionStartHour}
                        </p>
                        <p className="">
                          <span className="font-semibol d">Address:&nbsp;</span>
                          {currentSession?.address}
                        </p>
                        <p className="">
                          <span className="font-semibold">
                            Medical Notes:&nbsp;
                          </span>
                          {currentSession?.medicalNotes}
                        </p>
                        <p className="">
                          <span className="font-semibold">Overview:&nbsp;</span>
                          {currentSession?.overview}
                        </p>
                        <p className="">
                          <span className=" font-semibold">
                            Compensation Per Hour:&nbsp;
                          </span>
                          ${currentSession?.hourlyRate}
                        </p>
                        <p className="">
                          <span className=" font-semibold">Hours:&nbsp;</span>
                          {currentSession?.totalHours}
                        </p>
                        <p className="">
                          <span className=" font-semibold">Total:&nbsp;</span>$
                          {currentSession?.totalCompensation}
                        </p>
                        <p className="">
                          <span className=" font-semibold">Status:&nbsp;</span>
                          {currentSession?.careSessionStatus}
                        </p>
                      </div>
                    </div>
                    <div className="mt-12 mb-12 flex justify-center ">
                      {potentialCaregiver?.caregiverId !== user.id && (
                        <>
                          {potentialCaregiver?.caregiverId !== user.id && (
                            <button
                              className=" cursor-pointer border  border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
                            dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                              onClick={() => {
                                setInputs({
                                  currentUserId: user?.id,
                                  id: currentSession?.id || "",
                                });
                                publish();
                                updateCareSessionStatusToApplied();
                              }}
                            >
                              Apply
                            </button>
                          )}
                          {potentialCaregiver?.caregiverId === user.id &&
                            potentialCaregiver?.status !== "Closed" && (
                              <button
                                className=" cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
                              dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                                onClick={() => {
                                  setInputs({
                                    currentUserId: user?.id || "",
                                    id: currentSession?.id || "",
                                  });
                                  removeCaregiver();
                                }}
                              >
                                Cancel Application
                              </button>
                            )}
                          <div>
                            {errorMessage && (
                              <p className="text-red-600 text-center">
                                Meow! You already applied to this session.
                              </p>
                            )}
                          </div>
                        </>
                      )}
                      {potentialCaregiver?.caregiverId === user.id && (
                        <button
                          className=" cursor-pointer border  border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
                        dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                          onClick={() => {
                            setInputs({
                              currentUserId: user?.id || "",
                              id: currentSession?.id || "",
                            });
                            removeCaregiver();
                          }}
                        >
                          Cancel Application
                        </button>
                      )}
                    </div>
                    <div>
                      {errorMessage && (
                        <p className="text-red-600 text-center">
                          Meow! You already applied to this session.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
      {/***********************
       *       PATIENT        *
       **********************/}
      {session && user?.role === "Patient" && (
        <>
          <main className="grid grid-cols-1 bg-blue1 text-olive12 dark:bg-darkBlue1 dark:text-darkOlive12 md:grid-cols-6">
            <NavMenu />
            <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
              <div className="grid min-h-88vh grid-cols-1 gap-x-1 bg-blue1 dark:bg-darkBlue1">
                {/* DYNAMIC PART OF DASHBOARD */}
                <div className="grid min-h-screen md:grid-cols-3 ">
                  <div className="col-span-2 grid grid-cols-1 space-y-2 md:grid-cols-2  md:space-x-4 md:space-y-0">
                    <div className="col-span-1">
                      <div className=" min-h-88vh border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                        <h1 className="text-center text-lg font-extralight">
                          Overview
                        </h1>

                        <div className=" mb-2 mr-4 ml-4 mt-12 p-4 text-center text-xl">
                          {currentSession?.title}
                        </div>

                        <div className="  mx-4 mb-2 flex max-w-fit flex-col text-sm">
                          <p className="">
                            <span className=" font-semibold">Name:&nbsp;</span>
                            {currentSession?.name}
                          </p>
                        </div>

                        <div className="  mx-4 mb-2 flex max-w-fit flex-col text-sm">
                          <p className="">
                            <span className=" font-semibold">
                              Status:&nbsp;
                            </span>
                            {currentSession?.careSessionStatus}
                          </p>
                        </div>

                        <div className="  mx-4 mb-2 flex max-w-fit flex-row space-x-4 text-sm">
                          <p className="">
                            <span className=" font-semibold">Date:&nbsp;</span>
                            {sessionMonth} / {sessionDay} / {sessionYear}
                          </p>

                          <p className="">
                            <span className=" font-semibold">
                              Duration:&nbsp;
                            </span>
                            {sessionDurationHours} hours{" "}
                            {sessionDurationMinutes} minutes
                          </p>
                        </div>

                        <div className="  mx-4 mb-2 flex max-w-fit flex-row space-x-4 text-sm">
                          <p className="">
                            <span className="font-semibold">
                              Session Start:&nbsp;
                            </span>
                            {startTimeHour > 12
                              ? startTimeHour - 12
                              : startTimeHour}{" "}
                            :{" "}
                            {startTimeMinute < 10
                              ? "0" + startTimeMinute
                              : startTimeMinute}{" "}
                            {startTimeHour > 12 ? "PM" : "AM"}
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

                        <div className="mx-4 mb-2 flex w-full flex-col  pt-2 pr-6 text-sm ">
                          <p className="">
                            <span className=" font-semibold">
                              Overview:&nbsp;
                            </span>
                            <textarea
                              className="inline-block h-96 w-full border border-blue7
                    bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
                              // type="text"
                              id="firstName"
                              // defaultValue="select"
                              defaultValue={currentSession?.overview || ""}
                              readOnly={true}
                            />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 grid min-h-88vh grid-rows-2 space-y-2">
                      <div className="row-span-1 border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                        <h1 className="text-center text-lg font-extralight">
                          Location
                        </h1>

                        <div className="  mx-4 mb-2 flex min-w-full flex-col pr-8 text-sm">
                          <p className="">
                            <span className=" font-semibold">
                              Address:&nbsp;
                            </span>
                            {currentSession?.address}
                          </p>
                        </div>

                        <div className="flex-col-1 flex max-w-fit text-sm">
                          <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                            <p className="">
                              <span className=" font-semibold">
                                {/* ADD TO DB */}
                                City:&nbsp;
                              </span>
                              {currentSession?.address}
                            </p>
                          </div>
                          <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                            <p className="">
                              {/* ADD TO DB */}
                              <span className=" font-semibold">
                                Postal Code:&nbsp;
                              </span>
                              {currentSession?.address}
                            </p>
                          </div>
                        </div>

                        <div className="mx-4 mb-2 flex w-full flex-col  pt-2 pr-6 text-sm ">
                          <p className="">
                            {/* ADD TO DB */}
                            <span className=" font-semibold">
                              Location:&nbsp;
                            </span>
                            <textarea
                              className="inline-block h-24 w-full border border-blue7
                    bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
                              // type="text"
                              id="firstName"
                              // defaultValue="select"
                              defaultValue={currentSession?.overview || ""}
                              readOnly={true}
                            />
                          </p>
                        </div>
                      </div>

                      <div className="row-span-1 border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                        <h1 className="text-center text-lg font-extralight">
                          Compensation
                        </h1>

                        <div className=" max-w-fit text-sm">
                          <p className="">
                            <span className=" font-semibold">
                              Compensation Per Hour:&nbsp;
                            </span>
                            ${currentSession?.hourlyRate}
                          </p>
                        </div>
                        <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                          <p className="">
                            <span className=" font-semibold">Hours:&nbsp;</span>
                            {currentSession?.totalHours}
                          </p>
                        </div>
                        <div className="  mx-4 mb-2 flex min-w-full flex-col pr-8 text-sm">
                          <p className="">
                            <span className=" font-semibold">Total:&nbsp;</span>
                            ${currentSession?.totalCompensation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="px-2 ">
                      <p className="my-4 text-xl"> Potential Caregivers:</p>
                      <ul>
                        {potentialCaregivers?.map((potentialCaregiver) => {
                          const { id, caregiverId, status } =
                            potentialCaregiver;
                          return (
                            <li
                              key={id}
                              className="mb-2 cursor-pointer items-center justify-around rounded-lg border border-blue6 bg-blue1 px-2 hover:bg-blue2 dark:border-darkBlue6 dark:bg-darkBlue1 dark:hover:bg-darkBlue2"
                            >
                              <div>
                                <p className=" ">
                                  <span className=" font-semibold">
                                    Caregiver:&nbsp;
                                  </span>
                                  {potentialCaregiver?.caregiverId}
                                </p>
                                <p className="  ">
                                  <span className="  font-semibold">
                                    Status:&nbsp;
                                  </span>
                                  {potentialCaregiver?.status}
                                </p>
                              </div>
                              <div className="mt-2 mb-2 flex justify-around ">
                                <button
                                  className="cursor-pointer border  border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
                          dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                                  onClick={() =>
                                    router.push(
                                      `/caregiver/${potentialCaregiver?.slug}`
                                    )
                                  }
                                >
                                  See Profile
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Slug;
