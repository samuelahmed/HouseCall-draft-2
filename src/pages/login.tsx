import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import Header from "@/components/layout/header";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/dashboard/")
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />
      <div>
        {session && <></>}
        {!session && (
          <>
            <div className="flex min-h-screen flex-col items-center justify-center">
              <h1 className="py-10 text-center font-robotoSlab text-3xl font-bold">
                Login to your Account
              </h1>
              <LoginForm />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
