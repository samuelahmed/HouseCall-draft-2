import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AccountEditModal from "@/components/account/accountEditModal";
import Header from "@/components/layout/header";

const Account: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Header />
      <div>
        {session && (
          <>
            <AccountEditModal />
          </>
        )}
        {!session && <></>}
      </div>
    </>
  );
};

export default Account;
