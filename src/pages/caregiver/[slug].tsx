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

  //*** FUNCTIONS ***\\


  //*** TESTS ***\\


  // console.log(potentialCaregiver);
  return (
    <>
      <Head>
        <title>Session: {}</title>
      </Head>
      <NavLayout />
      {/***********************
       *      CAREGIVER       *
       **********************/}
      {session && user?.role === "Caregiver" && (
        <>
         
        </>
      )}
      {/***********************
       *       PATIENT        *
       **********************/}
      {session && user?.role === "Patient" && (
        <>
        </>
     
      )}
      {/***********************
       * CAREGIVER & PATIENT  *
       **********************/}
      {session && user?.role === "Caregiver & Patient" && (
        <>
       
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
