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

    //1) Route that bring in User data based on the CaregiverId

    //2) Route that allows the buttons to update the potentialCareSession
    //Route that allows the buttons to update the careSession
      //^^ do I need both of these or can I just use the one route? and only have one status across both models?

    

  //*** FUNCTIONS ***\\

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
              onClick={() => console.log("Accept Caregiver")}
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

// console.log(potentialCaregiver);

//create one CaregiverPage

//This page will be created when:
//1. A caregiver applies for a session - this page is created with caregiver current info & status pending & session unique info (like caregiver's notes)
//2. A caregiver is accepted for a session - This page is updated to reflect the accepted status
//3. A caregiver is declined for a session - This page is updated to reflect the declined status

//On this page the information displayed will be:
//1. Caregiver's name
//2. Caregiver's Image (maybe)
//3. Caregiver's notes when applying for the session (this needs to be built completely)
//4. Caregiver's hourly rate
//5. Caregiver's total expected hours
//6. Caregiver's total expected compensation
//7. Caregiver's status (accepted, pending, declined)
//8. Caregiver's rating (this needs to be built completely)
//9. Caregiver's reviews (DO WE WANT THIS?)

//On this page the follow actions can be taken:
//10. Button to Accept Caregiver
//11. Button to Decline Caregiver
//12. Button to Message Caregiver
