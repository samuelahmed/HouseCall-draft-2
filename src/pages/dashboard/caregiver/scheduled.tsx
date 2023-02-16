import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../../../components/layout/navLayout";
import { useSession } from "next-auth/react";
import SearchEngine from "@/components/engines/searchEngine";
import NavMenu from "@/components/layout/navMenu";
import LoginForm from "@/components/forms/loginForm";

const Scheduled: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Scheduled</title>
      </Head>
      <NavLayout />
      <div>
        {session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-max bg-blue1 dark:bg-darkBlue1">
                <div className="mx-4 mt-4 mb-1 flex items-center text-olive12 dark:text-darkOlive12">
                  <SearchEngine />
                </div>
                <div className="mx-4 grid min-h-88vh grid-cols-2 gap-x-1 bg-blue1 dark:bg-darkBlue1">
                  {/* DYNAMIC PART OF DASHBOARD */}

                </div>
              </div>
            </main>
          </>
        )}
        {!session && <>
          <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-max bg-blue1 dark:bg-darkBlue1">
                <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1">
                  <LoginForm />
                </div>
              </div>
            </main>
        
        </>}
      </div>
    </>
  );
};

export default Scheduled;
