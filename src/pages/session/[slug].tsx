import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Caregiver from "../caregiver";

const Slug: NextPage = () => {
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();
  const { data: session } = useSession();


  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { data: currentSession } = trpc.careSessionAPIs.readOneSessionBySlug.useQuery({
    slug,
  });

  const { data: potentialCaregivers } = trpc.careSessionAPIs.readAllPotentialCareSessionsByCareSessionId.useQuery({  
    careSessionId: currentSession?.sessionId || "",
  });

  const [inputs, setInputs] = useState({
    currentUserId: "",
    sessionId: currentSession?.sessionId || "",
    status: "pending",
  });




  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   if (user && currentSession) {
  //     setInputs({
  //       currentUserId: user.id,
  //       sessionId: currentSession.sessionId,
  //       status: "pending",
  //     });
  //   }
  // }, [user, currentSession]);

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
        caregiverId: user.id, //Is this necessary?
        careSessionId: currentSession.sessionId,
        // status: "pending", //Why can this be disabled?
      });
    }
  };

  const { mutate } =
    trpc.careSessionAPIs.createOnePotentialCaregiver.useMutation({
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        // some action on success
        //reoload page
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
        // some action on success
        //reoload page
        alert("Meow! You have removed yourself from this care session.");
        // router.reload();
      },
    });

  const { data: potentialCaregiver } =
    trpc.careSessionAPIs.readOnePotentialCaregiver.useQuery({
      careSessionId: currentSession?.sessionId || "",
    });

    // potentialCaregivers?.map((potentialCaregiver) => {
    //   console.log('potentialCaregiver' + ' ' +       potentialCaregiver.caregiverId
    //   )
    // })


    // console.log('user' + ' ' + user?.id)
    // console.log('currentSession.sessionId' + ' ' + currentSession?.sessionId)
    // console.log('caregiverId' + ' ' + potentialCaregiver)
    // console.log('careSessionid' + ' ' + potentialCaregiver?.careSessionId)
    // console.log('status' + ' ' + potentialCaregiver?.status)

console.log(currentSession?.sessionId)
console.log(user?.id)
console.log(potentialCaregivers)
console.log(potentialCaregiver?.id)



    
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
          <div className="flex h-screen items-center justify-center dark:bg-gray-800">
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
          <div className="flex h-screen items-center justify-center dark:bg-gray-800">
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
                <div>
                  List of potentialCareSession. 
                    {/* //map through potentialCareSession and display them */}
                {/* <ul>
                  {potentialCaregivers 
                    ?.map((potentialCaregiver) => {
                      const {
                        id,
                        caregiverId,
                        status,

                      } = potentialCaregiver;
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


                        </li>
                      );
                    })}
                </ul> */}
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
          </div>
        </>
      )}
      {/***********************
       * CAREGIVER & PATIENT  *
       **********************/}
      {session && user?.role === "Caregiver & Patient" && (
        <>
          <div className="flex h-screen items-center justify-center dark:bg-gray-800">
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
                {/* CURRENTLY MAKES ERROR THAT USER HAS ALREADY APPLIED IF ANOTHER USER HAS APPLIED
                TO FIX THIS THERE NEEDS TO BE LOGIC REFORM SO MULTIPLE SESSIONS CAN BE CREATED */}
                {/* FOR SOME REASON THIS IS NOT WORKING NEED TO TEST WITH SECOND USER */}
              {potentialCaregiver?.caregiverId !== user.id &&  (
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
                {/* BROKEN DOES NOT DELETE ANYTHING AT THE MOMENT */}
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
       *      NO SESSION      *
       **********************/}
      {!session && <></>}
    </>
  );
};

export default Slug;
