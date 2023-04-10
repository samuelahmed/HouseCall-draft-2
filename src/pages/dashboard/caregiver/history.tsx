import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";
import HistoryEngine from "@/components/caregiver/historyEngine";
import Header from "@/components/layout/header";

const History: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <Header />
      <div>
        {session && (
          <>
            <div className="mx-4 grid min-h-88vh grid-cols-2 gap-x-1 bg-blue1 dark:bg-darkBlue1">
              {/* DYNAMIC PART OF DASHBOARD */}
              <HistoryEngine />
            </div>
          </>
        )}
        {!session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
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

export default History;
