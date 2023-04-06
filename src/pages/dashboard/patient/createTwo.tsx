import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import Header from "@/components/layout/header";

//example minimal page.
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
            <div>{/* add stuff here */}</div>
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
