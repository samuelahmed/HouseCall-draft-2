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

  const { data: currentSession } =
    trpc.careSessionAPIs.readOnePotentialCaregiverPageBySlug.useQuery({
      slug,
    });


  //*** FUNCTIONS ***\\


  //*** TESTS ***\\

  return (
    <>
      <Head>
        <title>Session: {currentSession?.slug}</title>
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
      {session && user?.role === "Caregiver & Patient" && <>
       
       {/* {user.username} */}
       this need to be linked to caregiver User to get their name: 
       {currentSession?.caregiverId}
      
    
      </>}
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
