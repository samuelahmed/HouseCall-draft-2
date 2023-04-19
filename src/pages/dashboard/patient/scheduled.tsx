import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";
import UnderConstruction from "@/components/layout/underConstruction";
import LoginForm from "@/components/forms/loginForm";

const PatientScheduled: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Scheduled</title>
      </Head>
      <Header />
      <div>
        {session && (
          <>
            <UnderConstruction />










          </>
        )}
        {!session && <>
          <LoginForm />

        </>}
      </div>
    </>
  );
};

export default PatientScheduled;
