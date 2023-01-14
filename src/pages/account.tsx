import { type NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout/navLayout";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import AccountEditModal from "../components/accountPage/accountEditModal";

const Account: NextPage = () => {
  const { data, isLoading } = trpc.updateAccount.getOne.useQuery();
  const session = useSession();
  console.log(session);

  //Any issue with wrapping all return in a big if{}else{}?
  //Note: Putting else if (sessionData) causes error with Account: function.
  if (session.status === "unauthenticated" || session.status === "loading") {
    return (
      <>
        <Head>
          <title>Account</title>
        </Head>
        <Layout />
        <div className="flex h-screen flex-col flex-wrap items-center justify-center">
          <p>Login to see account page</p>
          <button
            className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-green-200 hover:text-black dark:text-white"
            onClick={() => signIn()}
          >
            sign in
          </button>
        </div>
      </>
    );
  } else if (session.status === "authenticated") {
    return (
      <>
        <Head>
          <title>Account</title>
        </Head>
        <Layout />
        <div className="grid min-h-screen justify-items-center dark:bg-gray-800">
          <div className="w-11/12 grid-rows-1 rounded bg-gray-100 dark:bg-gray-900">
            <Image
              className="ml-20 mt-20 rounded"
              src={(data && data?.image) || "/cat.jpg"}
              alt=""
              width={200}
              height={200}
            />
            {/* NOTE: DO I WANT TO USE SESSIONDATA AND DBTEST OR ONLY ONE OF THEM? */}
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
              {/* <div className="col-span-4 col-start-2">
                Address:
                {isLoading || (data && data?.address) || (
                  <span className="text-red-600">Meow! No Address</span>
                )}
              </div> */}
              {/* <div className="col-span-4 col-start-2">
                Role:
                {isLoading || (data && data?.role) || (
                  <span className="text-red-600">Meow! No Role</span>
                )}
              </div> */}
            </div>
            <div className="flex justify-center">
              <AccountEditModal />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <p>Something went very wrong</p>
      </div>
    );
  }
};

export default Account;
