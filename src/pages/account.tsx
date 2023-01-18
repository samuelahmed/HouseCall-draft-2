import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AccountEditModal from "../components/account/accountEditModal";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import Link from "next/link";

const Account: NextPage = () => {
  const { data, isLoading } = trpc.updateAccount.getOne.useQuery();
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <NavLayout />
      <ResponsiveLayout>
        <div>
          {session && (
            <div className="grid min-h-screen justify-items-center dark:bg-gray-800">
              <div className="w-11/12 grid-rows-1 rounded bg-gray-100 dark:bg-gray-900">
                <Image
                  className="ml-20 mt-20 rounded"
                  src={(data && data?.image) || "/cat.jpg"}
                  alt=""
                  width={200}
                  height={200}
                />
                <div className="grid grid-cols-6 gap-6 py-10">
                  <div className="col-span-4 col-start-2">
                    Name:
                    {isLoading || (data && data?.username) || (
                      <span className="text-red-600">Meow! No Name</span>
                    )}
                  </div>
                  <div className="col-span-4 col-start-2">
                    Email:
                    {isLoading ||
                      (data && data?.email) ||
                      "Meow, something went very wrong"}
                  </div>
                </div>
                <div className="flex justify-center">
                  <AccountEditModal />
                </div>
              </div>
            </div>
          )}
          {!session && (
          <main className="flex min-h-screen flex-col items-center justify-top md:justify-center lg:justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-[5rem] text-center border-gray-900">
              Account{" "}
              <span className="text-[hsl(280,100%,70%)]">Settings</span>
            </h1>
            <div className="flex flex-row gap-2">
              <Link href={"/login"} className="rounded border py-1 px-4">
                Sign in
              </Link>
              <Link href={"/register"} className="rounded border py-1 px-4">
                Register
              </Link>
            </div>
          </div>
        </main>
          )}
        </div>
      </ResponsiveLayout>
    </>
  );
};

export default Account;
