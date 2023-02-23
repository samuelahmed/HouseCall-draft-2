import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import NavLayout from "@/components/layout/navLayout";
import NavMenu from "@/components/layout/navMenu";
import LoginForm from "@/components/forms/loginForm";

const LoginSuccess: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();

  return (
    <>
      <Head>
        <title>Login Success</title>
      </Head>
      <NavLayout />
      {session && (
        <main className="grid grid-cols-1 bg-blue1 text-olive12 dark:bg-darkBlue1 dark:text-darkOlive12 md:grid-cols-6">
          <NavMenu />
          <div className="col-span-5 flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                Hello{" "}
                <span className="text-blue9">
                  {isLoading || (
                      <span className="text-blue9">
                        {data && data?.username}
                      </span>
                    ) || <span className="text-red-600">Meow! No Name</span>}
                </span>
              </h1>
            </div>
            {!data?.address && (
              <div className="flex flex-col items-center">
                <span className="text-red-700">
                  Your account needs an address
                </span>
                <Link
                  href={"/dashboard/account"}
                  className="mt-2 cursor-pointer border border-solid border-blue7 bg-blue3 px-1.5 py-1.5 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
                  dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                >
                  Add address
                </Link>
              </div>
            )}
            {!data?.role && (
              <div className="mt-6 flex flex-col items-center">
                <span className="text-red-700">Your account needs a role</span>
                <Link
                  href={"/dashboard/account"}
                  className="mt-2 cursor-pointer border border-solid border-blue7 bg-blue3 px-1.5 py-1.5 text-center text-olive12 hover:border-blue8 hover:bg-blue4 
                  dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                >
                  Add role
                </Link>
              </div>
            )}
          </div>
        </main>
      )}
      {!session && (
        <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
          <NavMenu />
          <div className="col-span-5 min-w-max bg-blue1 dark:bg-darkBlue1">
            <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1">
              <LoginForm />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default LoginSuccess;
