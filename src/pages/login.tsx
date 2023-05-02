import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import Header from "@/components/layout/header";

const Login: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {/* <NavLayout /> */}
      <Header />
      <div>
        {session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1">
                  {/* display nothing here since user is already logged in */}
                  {/* maybe add a logout button in the future */}
                </div>
              </div>
            </main>
          </>
        )}
        {!session && (
          <>
            <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="py-10 text-3xl font-bold text-center font-robotoSlab">
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
