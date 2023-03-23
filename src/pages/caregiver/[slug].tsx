import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import NavLayout from "@/components/layout/navLayout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";

const Slug: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { data: session } = useSession();
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();

  const { data: potentialCareSession } =
    trpc.careSessionAPIs.readOnePotentialCaregiverPageBySlug.useQuery({
      slug,
    });

  const { data: currentSession } =
    trpc.careSessionAPIs.readOneSessionBySessionId.useQuery({
      id: potentialCareSession?.careSessionId || "",
    });

  const { data: potentialCaregiverInfo } =
    trpc.careSessionAPIs.readOneUserByPotentialCareSessionCaregiverId.useQuery({
      caregiverId: potentialCareSession?.caregiverId || "",
    });

  const [inputs, setInputs] = useState({
    careSessionId: currentSession?.id || "",
    acceptedCaregiverId: "",
    careSessionStatus: "New",
  });

  const acceptedSession = () => {
    if (user && currentSession) {
      mutate({
        careSessionId: currentSession.id,
        acceptedCaregiverId: potentialCaregiverInfo?.id || "",
        careSessionStatus: "Scheduled",
        slug: currentSession.slug,
        userId: user.id,
      });
    }
  };

  const cancelSession = () => {
    if (user && currentSession) {
      mutate({
        careSessionId: currentSession.id,
        acceptedCaregiverId: "",
        careSessionStatus: "Canceled",
        slug: currentSession.slug,
        userId: user.id,
      });
    }
  };

  const closeThisPotentialCareSession = () => {
    if (user && currentSession) {
      mutate2({
        careSessionId: currentSession.id,
        caregiverId: potentialCaregiverInfo?.id || "",
        status: "Closed",
      });
    }
  };

  const updateThisPotentialCareSession = () => {
    if (user && currentSession) {
      mutate2({
        careSessionId: currentSession.id,
        caregiverId: potentialCaregiverInfo?.id || "",
        status: "Accepted",
      });
    }
  };

  const { mutate } = trpc.careSessionAPIs.updateOneCareSession.useMutation({
    onError: (error) => {
      alert("Something went wrong.");
    },
    onSuccess: () => {
      //Trigger some notifications here?
      router.push("/dashboard/patient/scheduled");
      // router.reload();
    },
  });

  const { mutate: mutate2 } =
    trpc.careSessionAPIs.updateOnePotentialCareSession.useMutation({
      onError: (error) => {
        alert("Something went wrong.");
      },
      onSuccess: () => {
        //Trigger some notifications here?
        // router.reload();
      },
    });

  const { mutate: mutate3 } =
    trpc.careSessionAPIs.updateAllOtherPotentialCareSessionsToClosed.useMutation(
      {
        onError: (error) => {
          alert("Something went wrong.");
        },
        onSuccess: () => {
          //Trigger some notifications here?
          // router.reload();
        },
      }
    );

  const updateAllOtherPotentialCareSessions = () => {
    if (user && currentSession) {
      mutate3({
        // careSessionId: currentSession.id,
        caregiverId: potentialCaregiverInfo?.id || "",
        // status: "Canceled",
      });
    }
  };

  //START OF PUSHER SETUP
  //create a pusherChannel entry in db when the patient messages the caregiver
  //TODO: make sure that multiple pusherChannels cannot be created for the same patient and caregiver
  const { mutate: mutate4 } = trpc.messageAPIs.createPusherChannel.useMutation({});
  const triggerCreatePusherChannel = () => {
    mutate4({
      patientId: user?.id || "",
      caregiverId: potentialCaregiverInfo?.id || "",
    });
  };
  //END OF PUSHER SETUP

  return (
    <>
      <Head>
        <title>PotentialCaregiver: {potentialCareSession?.caregiverId}</title>
      </Head>
      <NavLayout />
      {/***********************
       *       PATIENT        *
       **********************/}
      {session && user?.role === "Patient" && (
        <div className="flex min-h-screen flex-col items-center justify-center bg-blue1 text-olive12 dark:bg-darkBlue1 dark:text-darkOlive12">
          <h1 className="text-3xl ">{potentialCaregiverInfo?.username}</h1>
          <h1 className="text-1xl">{potentialCaregiverInfo?.email}</h1>
          <h1 className="text-1xl ">{potentialCaregiverInfo?.address}</h1>
          <div className="mt-2 mb-2 space-x-2 ">
            <button
              className="cursor-pointer border  border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
                                dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
              onClick={() => {
                triggerCreatePusherChannel();
                // router.push("/messages");
              }}
            >
              Message Caregiver
            </button>
            {/* In the future make sure that once a session is called it cannot just be reopened.
            However for testing at the moment is fine. */}
            {(potentialCareSession?.status === "Applied" ||
              potentialCareSession?.status === "Closed") && (
              <button
                className="cursor-pointer border  border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
              dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                onClick={() => {
                  setInputs({
                    careSessionId: currentSession?.id || "",
                    acceptedCaregiverId:
                      potentialCareSession?.caregiverId || "",
                    careSessionStatus: "Active",
                  });
                  acceptedSession();
                  updateThisPotentialCareSession();
                  updateAllOtherPotentialCareSessions();
                }}
              >
                Accept Caregiver
              </button>
            )}
            {currentSession?.careSessionStatus === "Scheduled" && (
              <button
                className="cursor-pointer border  border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
              dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                onClick={() => {
                  setInputs({
                    careSessionId: currentSession?.id || "",
                    acceptedCaregiverId: "",
                    careSessionStatus: "Canceled",
                  });
                  cancelSession();
                  closeThisPotentialCareSession();
                }}
              >
                Cancel Session
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Slug;
