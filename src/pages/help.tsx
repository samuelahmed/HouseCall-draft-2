import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import AccordionEngine from "@/components/help/accordion";
import Header from "@/components/layout/header";
import UnderConstruction from "@/components/layout/underConstruction";

const Help: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Help</title>
      </Head>
      {/* <NavLayout /> */}
      <Header />
      <div>
        {session && (
          <div>
            <UnderConstruction />
          </div>
        )}
        {!session && (
          <div>
            <UnderConstruction />
          </div>
        )}
      </div>
    </>
  );
};

export default Help;
