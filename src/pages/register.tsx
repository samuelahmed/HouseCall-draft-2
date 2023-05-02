import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import RegisterForm from "@/components/forms/registerForm";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";

const Register: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Header />
      <div>
        {session && <></>}
        {!session && (
          <>
            <div className="flex min-h-screen items-center justify-center">
              <RegisterForm />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
