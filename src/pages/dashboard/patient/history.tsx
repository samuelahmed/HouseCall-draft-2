import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";
import UnderConstruction from "@/components/layout/underConstruction";

const PatientHistory: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Completed</title>
      </Head>
      <Header />
      <div>
        {session && (
          <>
            <UnderConstruction />
          </>
        )}
        {!session && <></>}
      </div>
    </>
  );
};

export default PatientHistory;
