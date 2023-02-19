import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
// import SearchEngine from "@/components/engines/searchEngine";
import NavMenu from "@/components/layout/navMenu";
// import AccountEditModal from "@/components/account/accountEditModal";
import LoginForm from "@/components/forms/loginForm";

const Account: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <NavLayout />
      <div>
        {session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-max bg-blue1 dark:bg-darkBlue1">
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
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-max bg-blue1 dark:bg-darkBlue1">
                <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1">
                  <LoginForm />
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default Account;
