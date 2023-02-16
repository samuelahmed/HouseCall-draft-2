import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import NavLayout from "@/components/layout/navLayout";
import NavMenu from "@/components/layout/navMenu";

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
        <main className="grid grid-cols-1 text-olive12 dark:text-darkOlive12 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
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
                  {" "}
                  Your account needs an address{" "}
                </span>
                <Link
                  href={"/dashboard/account"}
                  className="px-1.5 py-1.5 mt-2 cursor-pointer border border-solid border-blue7 bg-blue3 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
                  dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                          >
                  Add address
                </Link>
              </div>
            )}

            {!data?.role && (
              <div className="mt-6 flex flex-col">
                <span className="text-red-700">
                  {" "}
                  Your account needs a role{" "}
                </span>
                <Link
                  href={"/dashboard/account"}
                  className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) border-gray-500 bg-transparent text-gray-800 dark:text-gray-100 dark:hover:text-gray-800 mt-6 h-10 rounded border px-4 pt-2 pb-8 text-center font-semibold hover:bg-[hsl(154,47%,66%)]"
                >
                  Add role
                </Link>
              </div>
            )}
          </div>
        </main>
      )}
      {!session && (
        <main className="justify-top flex min-h-screen flex-col items-center md:justify-center lg:justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="border-gray-900 text-gray-800 dark:text-white text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              House <span className="text-[hsl(280,100%,70%)]">Call</span>
            </h1>
            <div className="flex flex-row gap-2">
              <Link href={"/signin"} className="rounded border py-1 px-4">
                Sign in
              </Link>
              <Link href={"/register"} className="rounded border py-1 px-4">
                Register
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default LoginSuccess;
