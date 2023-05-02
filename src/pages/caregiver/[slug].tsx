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
          // router.reload();
        },
      }
    );

  const updateAllOtherPotentialCareSessions = () => {
    if (user && currentSession) {
      mutate3({
        caregiverId: potentialCaregiverInfo?.id || "",
      });
    }
  };

  //TODO: make sure that multiple pusherChannels cannot be created for the same patient and caregiver
  const { mutate: mutate4 } = trpc.messageAPIs.createPusherChannel.useMutation(
    {}
  );
  const triggerCreatePusherChannel = () => {
    mutate4({
      patientId: user?.id || "",
      caregiverId: potentialCaregiverInfo?.id || "",
    });
  };

  return (
    <>
      <Head>
        <title>PotentialCaregiver: {potentialCareSession?.caregiverId}</title>
      </Head>
      <Header />
      {session && user?.role === "Patient" && (
        <div className="font-roboto">
          <div>
            <p className="py-2 px-4">
              This page displays information about a potential caregiver, you
              can send them a message from here, and if they meet you needs
              accept them for you session.{" "}
            </p>
          </div>

          <div className="min-h-screen">
            <div className="grid grid-cols-2 py-4 px-4 md:px-20">
              <div className="col-span-1">
                Caregiver Name: {potentialCaregiverInfo?.username}
              </div>

              <div className="col-span-1">
                Caregiver City: {potentialCaregiverInfo?.city}
              </div>

              <div className="col-span-2 justify-self-center">
                <div className="mt-2 mb-2 flex space-x-2">
                  <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue7">
                    <button
                      className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue7"
                      onClick={() => {
                        // NEED TO FIGURE OUT HOW TO CHECK IF THERE IS A PUSHER CHANNEL AND IF THERE IS DO NOT CREATE A NEW ONE
                        triggerCreatePusherChannel();
                        // router.push("/dashboard/messages");
                      }}
                    >
                      Message Caregiver
                    </button>
                  </div>

                  {/* In the future make sure that once a session is called it cannot just be reopened.
                         However for testing at the moment is fine. */}
                  {(potentialCareSession?.status === "Applied" ||
                    potentialCareSession?.status === "Closed") && (
                    <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue7">
                      <button
                        className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue7"
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
                    </div>
                  )}
                  {currentSession?.careSessionStatus === "Scheduled" && (
                    <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue7">
                      <button
                        className="cursor-pointer bg-blue10 px-2 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue7"
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Slug;
