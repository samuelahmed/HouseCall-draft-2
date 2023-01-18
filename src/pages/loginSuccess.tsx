import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import NavLayout from "@/components/layout/navLayout";

const LoginSuccess: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.updateAccount.getOne.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavLayout />
      <ResponsiveLayout>
        {session && (
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white sm:text-[5rem]">
                Hello{" "}
                <span className="text-[hsl(280,100%,70%)]">
                  {isLoading || (
                      <span className="text-[hsl(280,100%,70%)]">
                        {data && data?.username}
                      </span>
                    ) || <span className="text-red-600">Meow! No Name</span>}
                </span>
              </h1>
            </div>
          </main>
        )}
        {!session && (
          <main className="flex min-h-screen flex-col items-center justify-top md:justify-center lg:justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-[5rem] text-center border-gray-900">
              House{" "}
              <span className="text-[hsl(280,100%,70%)]">Call</span>
            </h1>
            <div className="flex flex-row gap-2">
              <Link href={"/login"} className="rounded border py-1 px-4">
                Login
              </Link>
              <Link href={"/register"} className="rounded border py-1 px-4">
                Register
              </Link>
            </div>
          </div>
        </main>
        )}
      </ResponsiveLayout>
    </>
  );
};

export default LoginSuccess;
