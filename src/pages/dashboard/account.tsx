import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AccountEditModal from "@/components/account/accountEditModal";
import Header from "@/components/layout/header";
import { trpc } from "@/utils/trpc";
import LoginForm from "@/components/forms/loginForm";

const Account: NextPage = () => {
  const { data: session } = useSession();
  const { data: userData, isLoading } =
    trpc.userAPIs.readCurrentUser.useQuery();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Header />
      <div>
        {session && (
          <div className="font-roboto">
            <div>
              <p className="py-2 px-4">
                This page displays your account information. Use the edit
                account button to update your information.{" "}
              </p>
            </div>
            <div className="grid min-h-screen grid-cols-1">
              <div className="col-span-1 px-2">
                <div className="grid grid-cols-2">
                  <div className="col-span-1 px-2 py-2">
                    <div>Name: {userData?.username}</div>
                    <div>Email: {userData?.email}</div>
                    <div>Role: {userData?.role}</div>
                  </div>
                  <div className="col-span-1 px-2 py-2">
                    <div>Address: {userData?.address}</div>
                    <div>City: {userData?.city}</div>
                    <div>Postal Code: {userData?.postalCode}</div>
                  </div>
                </div>
                <div className="my-4 flex items-center justify-center">
                  <AccountEditModal />
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
        )}
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

export default Account;
