import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import { useSession } from "next-auth/react";
// import Caregiver from "../caregiver";

const Slug: NextPage = () => {
  //*** IMPORTS ***\\
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { data: session } = useSession();

  //*** API ROUTES ***\\
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();

  const { data: currentSession } =
    trpc.careSessionAPIs.readOneSessionBySlug.useQuery({
      slug,
    });

  const { data: potentialCaregivers } =
    trpc.careSessionAPIs.readAllPotentialCareSessionsByCareSessionId.useQuery({
      careSessionId: currentSession?.sessionId || "",
    });

  const { data: potentialCaregiver } =
    trpc.careSessionAPIs.readOnePotentialCaregiver.useQuery({
      // careSessionId: currentSession?.sessionId || "",
      caregiverId: user?.id || "",
      careSessionId: currentSession?.sessionId || "",
    });

  //*** FUNCTIONS ***\\
  const [inputs, setInputs] = useState({
    currentUserId: "",
    sessionId: currentSession?.sessionId || "",
    status: "pending",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const publish = () => {
    if (user && currentSession) {
      mutate({
        caregiverId: user.id,
        careSessionId: currentSession.sessionId,
        status: "pending",
      });
    }
  };

  const removeCaregiver = () => {
    if (user && currentSession) {
      mutateTwo({
        caregiverId: user.id,
        careSessionId: currentSession.sessionId,
      });
    }
  };

  const { mutate } =
    trpc.careSessionAPIs.createOnePotentialCaregiver.useMutation({
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

  //*** TESTS ***\\
  // console.log(currentSession?.sessionId);
  console.log("user.id" + " " + user?.id);
  // console.log(potentialCaregivers);
  console.log(
    "potentialCaregiver?.caregiverId" + " " + potentialCaregiver?.caregiverId
  );

  console.log(potentialCaregiver);
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
          <div className="h-screen items-center justify-center dark:bg-gray-800 md:flex">
            <div className="mx-2 my-2 h-4/6 w-1/2 rounded-lg border-2 dark:bg-sky-900">
              <div className="mb-4 mr-4 ml-4">
                <div className="mb-2 mr-4 ml-4 mt-12 p-4 text-center  text-xl text-gray-900 dark:text-white">
                  {currentSession?.title}
                </div>
                <div className="text-sm">
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Name:&nbsp;
                    </span>
                    {currentSession?.name}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Address:&nbsp;
                    </span>
                    {currentSession?.address}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Medical Notes:&nbsp;
                    </span>
                    {currentSession?.medicalNotes}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Overview:&nbsp;
                    </span>
                    {currentSession?.overview}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Compensation Per Hour:&nbsp;
                    </span>
                    ${currentSession?.hourlyRate}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Hours:&nbsp;
                    </span>
                    {currentSession?.totalHours}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Total:&nbsp;
                    </span>
                    ${currentSession?.totalCompensation}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Status:&nbsp;
                    </span>
                    {currentSession?.careSessionStatus}
                  </p>
                </div>
              </div>
              <div className="mt-12 mb-12 flex justify-around ">
                {potentialCaregiver?.caregiverId !== user.id && (
                  <button
                    className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                    onClick={() => {
                      setInputs({
                        currentUserId: user?.id || "",
                        sessionId: currentSession?.sessionId || "",
                        status: "pending",
                      });
                      publish();
                    }}
                  >
                    Apply
                  </button>
                )}
                {potentialCaregiver?.caregiverId === user.id && (
                  <button
                    className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                    onClick={() => {
                      setInputs({
                        currentUserId: user?.id || "", //Why is this necessary?
                        sessionId: currentSession?.sessionId || "",
                        status: "pending", //Why is this necessary?
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
                  <p className="text-center text-red-600">
                    Meow! You already applied to this session.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {/***********************
       *       PATIENT        *
       **********************/}
      {session && user?.role === "Patient" && (
        <>
          <div className="h-screen items-center justify-center dark:bg-gray-800 md:flex">
            <div className="mx-2 my-2 h-4/6 w-1/2 rounded-lg border-2 dark:bg-sky-900">
              <div className="mb-4 mr-4 ml-4">
                <div className="mb-2 mr-4 ml-4 mt-12 p-4 text-center  text-xl text-gray-900 dark:text-white">
                  {currentSession?.title}
                </div>
                <div className="text-sm">
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Name:&nbsp;
                    </span>
                    {currentSession?.name}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Address:&nbsp;
                    </span>
                    {currentSession?.address}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Medical Notes:&nbsp;
                    </span>
                    {currentSession?.medicalNotes}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Overview:&nbsp;
                    </span>
                    {currentSession?.overview}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Compensation Per Hour:&nbsp;
                    </span>
                    ${currentSession?.hourlyRate}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Hours:&nbsp;
                    </span>
                    {currentSession?.totalHours}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Total:&nbsp;
                    </span>
                    ${currentSession?.totalCompensation}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Status:&nbsp;
                    </span>
                    {currentSession?.careSessionStatus}
                  </p>
                </div>
              </div>
              <div>
                {errorMessage && (
                  <p className="text-center text-red-600">
                    Meow! You already applied to this session.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full px-2">
              List of potential Caregivers:
              {/* //map through potentialCareSession and display them */}
              <ul>
                {potentialCaregivers?.map((potentialCaregiver) => {
                  const { id, caregiverId, status } = potentialCaregiver;
                  return (
                    <li
                      key={id}
                      className="mb-2 cursor-pointer items-center justify-around rounded-lg border border-gray-400  bg-white px-2 hover:bg-gray-100 dark:border-gray-400  dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <div>
                        <p className="text-gray-900  dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Caregiver:&nbsp;
                          </span>
                          {potentialCaregiver?.caregiverId}
                        </p>
                        <p className="text-gray-900  dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Status:&nbsp;
                          </span>
                          {potentialCaregiver?.status}
                        </p>
                      </div>
                      <div className="mt-2 mb-2 flex justify-around ">
                        <button
                          className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                          onClick={() => {
                            // Do stuff to link to caregiver profile
                            //Note confirmation will occur on the profile of the caregiver
                            //there will also be a link to message the caregiver on their profile.
                          }}
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
        </>
      )}
      {/***********************
       * CAREGIVER & PATIENT  *
       **********************/}
      {session && user?.role === "Caregiver & Patient" && (
        <>
          <div className="h-screen items-center justify-center dark:bg-gray-800 md:flex">
            <div className="mx-2 my-2 h-4/6 w-1/2 rounded-lg border-2 dark:bg-sky-900">
              <div className="mb-4 mr-4 ml-4">
                <div className="mb-2 mr-4 ml-4 mt-12 p-4 text-center  text-xl text-gray-900 dark:text-white">
                  {currentSession?.title}
                </div>
                <div className="text-sm">
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Name:&nbsp;
                    </span>
                    {currentSession?.name}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Address:&nbsp;
                    </span>
                    {currentSession?.address}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Medical Notes:&nbsp;
                    </span>
                    {currentSession?.medicalNotes}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Overview:&nbsp;
                    </span>
                    {currentSession?.overview}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Compensation Per Hour:&nbsp;
                    </span>
                    ${currentSession?.hourlyRate}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Hours:&nbsp;
                    </span>
                    {currentSession?.totalHours}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Total:&nbsp;
                    </span>
                    ${currentSession?.totalCompensation}
                  </p>
                  <p className="text-gray-900  dark:text-white">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Status:&nbsp;
                    </span>
                    {currentSession?.careSessionStatus}
                  </p>
                </div>
              </div>
              <div className="mt-12 mb-12 flex justify-around ">
                {potentialCaregiver?.caregiverId !== user.id && (
                  <button
                    className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                    onClick={() => {
                      setInputs({
                        currentUserId: user?.id,
                        sessionId: currentSession?.sessionId || "",
                        status: "pending",
                      });
                      publish();
                    }}
                  >
                    Apply
                  </button>
                )}
                {potentialCaregiver?.caregiverId === user.id && (
                  <button
                    className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                    onClick={() => {
                      setInputs({
                        currentUserId: user?.id || "",
                        sessionId: currentSession?.sessionId || "",
                        status: "pending",
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
                  <p className="text-center text-red-600">
                    Meow! You already applied to this session.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full px-2">
              List of potential Caregivers:
              {/* //map through potentialCareSession and display them */}
              <ul>
                {potentialCaregivers?.map((potentialCaregiver) => {
                  const { id, caregiverId, status } = potentialCaregiver;
                  return (
                    <li
                      key={id}
                      className="mb-2 cursor-pointer items-center justify-around rounded-lg border border-gray-400  bg-white px-2 hover:bg-gray-100 dark:border-gray-400  dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <div>
                        <p className="text-gray-900  dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Caregiver:&nbsp;
                          </span>
                          {potentialCaregiver?.caregiverId}
                        </p>
                        <p className="text-gray-900  dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Status:&nbsp;
                          </span>
                          {potentialCaregiver?.status}
                        </p>
                      </div>
                      <div className="mt-2 mb-2 flex justify-around ">
                        <button
                          className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                          onClick={() => {

                            // Do stuff to link to caregiver profile
                            //Note confirmation will occur on the profile of the caregiver
                            //there will also be a link to message the caregiver on their profile.
                            //This is just a link to their profile
                            console.log(potentialCaregiver)

                          }}
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
        </>
      )}
      {/***********************
       *      NO SESSION      *
       **********************/}
      {!session && <></>}
    </>
  );
};

export default Slug;
