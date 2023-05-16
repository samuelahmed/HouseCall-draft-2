import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import { use, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";

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
        alert("You have successfully applied to this care session.");
        // router.reload();
      },
    });

  const { mutate: cancelCareSession } =
    trpc.careSessionAPIs.cancelOneCareSession.useMutation({
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        alert("You have successfully cancelled this care session.");
        // router.reload();
      },
    });

  const cancelThisCareSession = () => {
    if (currentSession) {
      cancelCareSession({
        patientId: user?.id || "",
        careSessionId: currentSession.id,
      });
    }
  };

  const { mutate: reactivateCareSession } =
    trpc.careSessionAPIs.reActivateOneCareSession.useMutation({
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        alert("You have successfully reactivated this care session.");
        // router.reload();
      },
    });

  const reactivateThisCareSession = () => {
    if (currentSession) {
      reactivateCareSession({
        patientId: user?.id || "",
        careSessionId: currentSession.id,
        potentialCaregiverId: potentialCaregiver?.id || "",
      });
    }
  };

  // console.log(currentSession?.userId )
  // console.log(user?.id)

  const { mutate: mutateTwo } =
    trpc.careSessionAPIs.deleteOnePotentialCaregiver.useMutation({
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        alert("You have removed yourself from this care session.");
        // router.reload();
      },
    });

  const { mutate: mutationUpdateCareSessionStatusToApplied } =
    trpc.careSessionAPIs.updateOneCareSessionTwo.useMutation({
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        alert("The Care Session status has been automatically updated.");
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
                    <Button
                      variant="default"
                      size="lg"
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
                    </Button>
                  )}
                  {potentialCaregiver?.caregiverId === user.id &&
                    potentialCaregiver?.status !== "Closed" && (
                      <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue7">
                        <button
                          className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue7"
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
                      <p className="text-center text-red11">
                        You already applied to this session.
                      </p>
                    )}
                  </div>
                </>
              )}

              {potentialCaregiver?.caregiverId === user.id && (
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => {
                    setInputs({
                      currentUserId: user?.id || "",
                      id: currentSession?.id || "",
                    });
                    removeCaregiver();
                  }}
                >
                  Cancel Application
                </Button>
              )}
            </div>

            <div>
              {errorMessage && (
                <p className="text-center text-red11">
                  You already applied to this session.
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
        <div className="font-roboto">
          <div>
            <p className="py-2 px-4">
              This page display the session information and allows you to see
              potential caregivers that applied.
            </p>
          </div>
          <div className="grid min-h-screen grid-cols-1 px-4 py-4 md:grid-cols-2">
            <div className="col-span-1">
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
              <div>
                {currentSession?.userId === user.id && (
                  <>
                    {(currentSession?.careSessionStatus === "Active" ||
                      currentSession?.careSessionStatus === "New") && (
                      <Button
                        variant="redButton"
                        size="default"
                        onClick={() => {
                          cancelThisCareSession();
                        }}
                      >
                        Cancel Session
                      </Button>
                    )}
                    {currentSession?.careSessionStatus === "Canceled" && (
                      <Button
                        variant="default"
                        size="default"
                        onClick={() => {
                          reactivateThisCareSession();
                        }}
                      >
                        Reactive Session
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="col-span-1 px-2">
              <p className="text-center text-xl">Caregivers</p>
              {potentialCaregivers?.length === 0 ? (
                <p className="text-center">No caregivers have applied yet</p>
              ) : (
                <ul>
                  {potentialCaregivers?.map((potentialCaregiver) => {
                    const { id, caregiverId, status } = potentialCaregiver;
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
                          <Button
                            variant="default"
                            size="default"
                            onClick={() =>
                              router.push(
                                `/caregiver/${potentialCaregiver?.slug}`
                              )
                            }
                          >
                            See Profile
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Slug;
