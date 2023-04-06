import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import CreateSession from "@/components/patient/createSession";
import { OverlayContainer } from "@react-aria/overlays";
import Header from "@/components/layout/header";

const Create: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Create</title>
      </Head>
      <Header />
      <div>
        {session && (
          <>
            {/* TODO: Properly use OverlayContainer */}
            {/* <OverlayContainer> */}
              <CreateSession />
            {/* </OverlayContainer> */}
          </>
        )}
        {!session && (
          <>
            <LoginForm />
          </>
        )}
      </div>
    </>
  );
};

export default Create;
