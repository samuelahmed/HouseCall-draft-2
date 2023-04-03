import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../../components/layout/navLayout";
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
      {/* <NavLayout /> */}
      < Header />
      <div>

        {session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className="h-10 mx-4 mt-4 mb-1 flex items-center text-olive12 dark:text-darkOlive12">
                  {/* <SearchEngine /> */}
                </div>
                <div className="mx-4 grid min-h-88vh grid-cols-2 gap-x-1 bg-blue1 dark:bg-darkBlue1">
                  {/* DYNAMIC PART OF DASHBOARD */}
                  <AccountEditModal />
                </div>
              </div>
            </main>
          </>
        )}
        {!session && <></>}
      </div>
    </>
  );
};

export default Account;
