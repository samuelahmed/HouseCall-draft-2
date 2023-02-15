import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import { useSession } from "next-auth/react";

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
      router.reload();
    },
  });

  const { mutate: mutate2 } =
    trpc.careSessionAPIs.updateOnePotentialCareSession.useMutation({
      onError: (error) => {
        alert("Something went wrong.");
      },
      onSuccess: () => {
        //Trigger some notifications here?
        router.reload();
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
        <>
          <h1 className="text-3xl  text-gray-900 dark:text-white">
            {potentialCaregiverInfo?.username}
          </h1>
          <h1 className="text-1xl text-gray-900 dark:text-white">
            {potentialCaregiverInfo?.email}
          </h1>
          <h1 className="text-1xl  text-gray-900 dark:text-white">
            {potentialCaregiverInfo?.address}
          </h1>
          <div className="mt-2 mb-2 space-x-2 ">
            <button
              className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
              onClick={() => router.push("/messages")}
            >
              Message Caregiver
            </button>
            {/* In the future make sure that once a session is called it cannot just be reopened.
            However for testing at the moment is fine. */}
            {(potentialCareSession?.status === "Applied" ||
              potentialCareSession?.status === "Closed") && (
              <button
                className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
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
                className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
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
        </>
      )}
    </>
  );
};

export default Slug;
