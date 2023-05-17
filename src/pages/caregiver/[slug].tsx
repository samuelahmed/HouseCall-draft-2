import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
// import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="default" size="default">
                        Message Caregiver
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you certain?</AlertDialogTitle>
                        <AlertDialogDescription>
                          If you select message, the caregiver will be added to
                          your contact list and you will be able to message
                          them.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            // NEED TO FIGURE OUT HOW TO CHECK IF THERE IS A PUSHER CHANNEL AND IF THERE IS DO NOT CREATE A NEW ONE
                            triggerCreatePusherChannel();
                            // router.push("/dashboard/messages");
                          }}
                        >
                          Message
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* In the future make sure that once a session is called it cannot just be reopened.
                         However for testing at the moment is fine. */}
                  {(potentialCareSession?.status === "Applied" ||
                    potentialCareSession?.status === "Closed") && (
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="default" size="default">
                          Accept Caregiver
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you certain?</AlertDialogTitle>
                          <AlertDialogDescription>
                            If you select accept, this caregiver will be
                            assigned to your session.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
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
                            Accept
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {currentSession?.careSessionStatus === "Scheduled" && (
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="redButton" size="default">
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you certain?</AlertDialogTitle>
                          <AlertDialogDescription>
                            If you select remove, the caregiver will be removed
                            and your session will be canceled.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
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
                            Remove Caregiver
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
