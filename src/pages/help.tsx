import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import NavMenu from "@/components/layout/navMenu";
import AccordionEngine from "@/components/help/accordion";
import Header from "@/components/layout/header";

const Help: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Help</title>
      </Head>
      {/* <NavLayout /> */}
      < Header />
      <div>
        {session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className="mx-4 grid min-h-95vh grid-cols-1 gap-x-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-2">
                  {/* DYNAMIC PART OF DASHBOARD */}
                  <div className="mt-2">
                    <AccordionEngine />
                  </div>
                  <div></div>
                </div>
              </div>
            </main>
          </>
        )}
        {!session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className="mx-4 grid min-h-95vh grid-cols-1 gap-x-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-2">
                  {/* DYNAMIC PART OF DASHBOARD */}
                  <div className="col-span-1 mx-1 px-4 pt-4">
                    <AccordionEngine />
                  </div>
                  <div className="col-span-1 mx-1 px-4">
                    {/* < ContactUs /> */}
                    <div>contact us form</div>
                  </div>
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default Help;
