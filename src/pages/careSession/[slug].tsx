import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
// import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";

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
  const sessionDay = currentSession?.sessionDay;
  const sessionMonth = currentSession?.sessionMonth;
  const sessionYear = currentSession?.sessionYear;

  return (
    <>
      <Head>
        <title>Session: {currentSession?.slug}</title>
      </Head>
      {/* <NavLayout /> */}
      <Header />
      {/***********************
       *      CAREGIVER       *
       **********************/}
      {session && user?.role === "Caregiver" && (
        <div className="font-roboto">
          <div>
            <p className="py-2 px-4">
              This page display a session. If you think you would be a good
              caregiver for this patient, click apply. The patient will be able
              to message and accept you as their caregiver.
            </p>
          </div>
          <div className="min-h-screen px-4 py-4">
            <div className="text-center text-2xl  ">
              {currentSession?.title}
            </div>
            {/* INTERNAL BOX */}
            <div className="grid grid-cols-2 justify-center ">
              {/* TOP LEFT */}
              <div className="col-span-1 px-2 py-2">
                {/* STATUS */}
                <p className="">
                  <span className="">Status:&nbsp;</span>
                  {currentSession?.careSessionStatus}
                </p>
                {/* NAME */}
                <p className="">
                  <span className="">Name:&nbsp;</span>
                  {currentSession?.name}
                </p>
                {/* DATE */}
                <p className="">
                  <span className="">Date:&nbsp;</span>
                  {sessionMonth}/{sessionDay}/{sessionYear}
                </p>
              </div>
              {/* TOP RIGHT */}
              <div className="col-span-1 px-2 py-2">
                {/* SESSION START  */}
                {currentSession?.sessionStartHour !== null &&
                  currentSession?.sessionStartHour !== undefined &&
                  currentSession?.sessionStartMinute !== null &&
                  currentSession?.sessionStartMinute !== undefined && (
                    <p className="">
                      <span className="">Session Start:&nbsp;</span>
                      {currentSession?.sessionStartHour > 12
                        ? currentSession?.sessionStartHour - 12
                        : currentSession?.sessionStartHour}
                      :
                      {currentSession?.sessionStartMinute < 10
                        ? "0" + currentSession?.sessionStartMinute
                        : currentSession?.sessionStartMinute}{" "}
                      {currentSession?.sessionStartMinute > 12 ? "PM" : "AM"}
                    </p>
                  )}
                {/* SESSION END  */}
                {currentSession?.sessionEndHour !== null &&
                  currentSession?.sessionEndHour !== undefined &&
                  currentSession?.sessionEndMinute !== null &&
                  currentSession?.sessionEndMinute !== undefined && (
                    <p className="">
                      <span className="">Session End:&nbsp;</span>
                      {currentSession?.sessionEndHour > 12
                        ? currentSession?.sessionEndHour - 12
                        : currentSession?.sessionEndHour}
                      :
                      {currentSession?.sessionEndMinute < 10
                        ? "0" + currentSession?.sessionEndMinute
                        : currentSession?.sessionEndMinute}{" "}
                      {currentSession?.sessionEndHour > 12 ? "PM" : "AM"}
                    </p>
                  )}
                {/* SESSION DURATION  */}
                <p className="">
                  {currentSession?.sessionEndHour !== null &&
                    currentSession?.sessionEndHour !== undefined &&
                    currentSession?.sessionEndMinute !== null &&
                    currentSession?.sessionEndMinute !== undefined &&
                    currentSession?.sessionStartHour !== null &&
                    currentSession?.sessionStartHour !== undefined &&
                    currentSession?.sessionStartMinute !== null &&
                    currentSession?.sessionStartMinute !== undefined && (
                      <p>
                        <span className=" ">Duration:&nbsp;</span>
                        {currentSession?.sessionEndHour -
                          currentSession?.sessionStartHour}{" "}
                        hours{" "}
                        {currentSession?.sessionEndMinute -
                          currentSession?.sessionStartMinute}{" "}
                        minutes{" "}
                      </p>
                    )}
                </p>
              </div>
            </div>
            <div className="mx-2 grid grid-cols-1 justify-center ">
              {/* MIDDLE BOX FOR OVERVIEW */}
              <p className="">
                <span className="">Overview:&nbsp;</span>
                <textarea
                  className="inline-block h-16 w-full border px-1 py-1 align-text-top focus:outline-none dark:bg-darkBg "
                  id="firstName"
                  defaultValue={currentSession?.overview || ""}
                  readOnly={true}
                />
              </p>
            </div>
            {/* MIDDLE BOX SPLIT */}
            <div className="grid grid-cols-2 justify-center ">
              {/* MIDDLE LEFT */}
              <div className="col-span-1  px-2 py-2">
                {/* ADDRESS */}
                <p className="">
                  <span className="">Address:&nbsp;</span>
                  {currentSession?.address}
                </p>
              </div>
              {/* MIDDLE RIGHT */}
              <div className="col-span-1 px-2 py-2">
                {/* CITY */}
                <p className="">
                  <span className="">City:&nbsp;</span>
                  {currentSession?.city}
                </p>
                {/* POSTAL CODE */}
                <p className="">
                  <span className="">Postal Code:&nbsp;</span>
                  {currentSession?.postalCode}
                </p>
              </div>
            </div>
            {/* MIDDLE BOX FOR LOCATION */}
            <div className="mx-2 grid grid-cols-1 justify-center">
              <p className="">
                <span className="">Location:&nbsp;</span>
                <textarea
                  className="inline-block h-16 w-full border px-1 py-1 align-text-top focus:outline-none dark:bg-darkBg "
                  id="firstName"
                  defaultValue={currentSession?.location || ""}
                  readOnly={true}
                />
              </p>
            </div>
            <div className="grid grid-cols-2 justify-center">
              {/* BOTTOM LEFT */}
              <div className="col-span-1 px-2 py-2">
                {/* HOURLY RATE */}
                <p className="">
                  <span className="">Hourly Rate:&nbsp;</span>$
                  {currentSession?.hourlyRate}
                </p>
                {/* HOURS */}
                <p className="">
                  <span className="">Hours:&nbsp;</span>
                  {currentSession?.totalHours}
                </p>
              </div>
              {/* BOTTOM RIGHT */}
              <div className="col-span-1 px-2 py-2">
                {/* TOTAL COMPENSATION */}
                <p className="">
                  <span className="">Total:&nbsp;</span>$
                  {currentSession?.totalCompensation}
                </p>
              </div>
            </div>
            {/* SESSION CREATED */}
            <p className="px-2 py-2 text-sm">
              <span className="">Session Created:&nbsp;</span>
              {currentSession?.createdAt.toDateString()}
            </p>
            <div className="flex flex-col items-center justify-center py-4">
              {potentialCaregiver?.caregiverId !== user.id && (
                <>
                  {potentialCaregiver?.caregiverId !== user.id && (
                    <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue2">
                      <button
                        className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue2"
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
                    </div>
                  )}
                  {potentialCaregiver?.caregiverId === user.id &&
                    potentialCaregiver?.status !== "Closed" && (
                      <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue2">
                        <button
                          className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue2"
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
                      </div>
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
                <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue2">
                  <button
                    className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue2"
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
                </div>
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
      )}
      {/***********************
       *       PATIENT        *
       **********************/}
      {session && user?.role === "Patient" && (
        <>
          <main className="grid grid-cols-1 bg-blue1 text-olive12 dark:bg-darkBlue1 dark:text-darkOlive12 md:grid-cols-6">
            <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
              <div className="grid min-h-88vh grid-cols-1 gap-x-1 bg-blue1 dark:bg-darkBlue1">
                {/* DYNAMIC PART OF DASHBOARD */}
                <div className="grid min-h-screen md:grid-cols-2 ">
                  <div className="col-span-2 mt-4 grid grid-cols-1 space-y-2  md:ml-4 md:grid-cols-2 md:space-x-4 md:space-y-0">
                    <div className="col-span-1">
                      <div className=" mx-4 min-h-88vh border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                        <h1 className="text-center text-lg font-extralight">
                          Overview
                        </h1>

                        <div className=" mb-2 mr-4 ml-4 mt-4 p-4 text-center text-xl">
                          {currentSession?.title}
                        </div>

                        <div className="grid grid-rows-3 space-y-1 px-4 text-sm">
                          <div className="row-span-1 grid grid-cols-2">
                            <div className="col-span-1 min-w-max">
                              <p className=" min-w-max">
                                <span className=" font-semibold">
                                  Name:&nbsp;
                                </span>
                                {currentSession?.name}
                              </p>
                            </div>

                            <div className="col-span-1 min-w-max">
                              <p className="">
                                <span className=" font-semibold">
                                  Status:&nbsp;
                                </span>
                                {currentSession?.careSessionStatus}
                              </p>
                            </div>
                          </div>

                          <div className="row-span-1 grid grid-cols-2">
                            <p className="">
                              <span className=" font-semibold">
                                Date:&nbsp;
                              </span>
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

                          <div className="row-span-1 grid grid-cols-2">
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
                              {endTimeHour > 12
                                ? endTimeHour - 12
                                : endTimeHour}{" "}
                              :{" "}
                              {endTimeMinute < 10
                                ? "0" + endTimeMinute
                                : endTimeMinute}{" "}
                              {endTimeHour > 12 ? "PM" : "AM"}
                            </p>
                          </div>
                        </div>
                        <div className="mx-4 mb-2 flex w-full flex-col  pt-2 pr-6 text-sm ">
                          <p className="">
                            <span className=" font-semibold">
                              Session Overview:&nbsp;
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
                    <div className="col-span-1 flex flex-col space-y-2">
                      <div className="row-span-1 mx-4 border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
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
                              {currentSession?.city}
                            </p>
                          </div>
                          <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
                            <p className="">
                              {/* ADD TO DB */}
                              <span className=" font-semibold">
                                Postal Code:&nbsp;
                              </span>
                              {currentSession?.postalCode}
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
                              defaultValue={currentSession?.location || ""}
                              readOnly={true}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="row-span-1 mx-4 border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                        <h1 className="text-center text-lg font-extralight">
                          Compensation
                        </h1>
                        <div className="col-span-1 mx-4 flex max-w-fit flex-col text-sm">
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
                      <div className="px-2 ">
                        <p className="text-center text-xl">Caregivers</p>
                        {potentialCaregivers?.length === 0 ? (
                          <p className="text-center">
                            No caregivers have applied yet
                          </p>
                        ) : (
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
                        )}
                      </div>
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
