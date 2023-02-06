import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Slug: NextPage = () => {
  //*** IMPORTS ***\\
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { data: session } = useSession();

  //*** API ROUTES ***\\
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();


  const { data: potentialCareSession } =
    trpc.careSessionAPIs.readOnePotentialCaregiverPageBySlug.useQuery({
      slug,
    });

    const { data: currentSession } =
    trpc.careSessionAPIs.readOneSessionBySessionId.useQuery({
      id: potentialCareSession?.careSessionId || "",
    });

    console.log(currentSession)

    // console.log(potentialCareSession)

  //*** FUNCTIONS ***\\
  const [inputs, setInputs] = useState({
    careSessionId: currentSession?.id || "",
    acceptedCaregiverId: "",
    careSessionStatus: "pending",
  });

  const publish = () => {
    if (user && currentSession) {
      mutate({
        careSessionId: currentSession.id,
        acceptedCaregiverId: user.id,
        careSessionStatus: "accepted",
        slug: currentSession.slug,
        userId: user.id,
      });
    }
  };



  const { mutate } = trpc.careSessionAPIs.updateOneCareSession.useMutation({
    onError: (error) => {
      alert("Meow! Something went wrong.");
    },
    onSuccess: () => {
      alert("Meow! You have removed yourself from this care session.");
      // router.reload();
    },
  });
  //*** TESTS ***\\

  return (
    <>
      <Head>
        <title>PotentialCaregiver: {potentialCareSession?.caregiverId}</title>
      </Head>
      <NavLayout />
      {/***********************
       *      CAREGIVER       *
       **********************/}
      {session && user?.role === "Caregiver" && <></>}
      {/***********************
       *       PATIENT        *
       **********************/}
      {session && user?.role === "Patient" && <></>}
      {/***********************
       * CAREGIVER & PATIENT  *
       **********************/}
      {session && user?.role === "Caregiver & Patient" && (
        <>
          {/* {user.username} */}
          this need to be linked to caregiver User to get their name:
          {potentialCareSession?.caregiverId}
          <div className="mt-2 mb-2 space-x-2 ">
            <button
              className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
              onClick={() => router.push("/messages")}
            >
              Message Caregiver
            </button>

            <button
              className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
              onClick={() => {
                console.log("Accept Caregiver CLICKED");
                setInputs({
                  careSessionId: currentSession?.id || "",
                  acceptedCaregiverId: potentialCareSession?.caregiverId || "",
                  careSessionStatus: "accepted",
                });
                publish();
                console.log("inputs" + inputs);
              }}
            >
              Accept Caregiver
            </button>

            <button
              className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-900 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white"
              onClick={() => console.log("Deny Caregiver")}
            >
              Deny Caregiver
            </button>
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
