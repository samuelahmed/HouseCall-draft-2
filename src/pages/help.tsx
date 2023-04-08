import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
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
      <Header />
      <div>
        {session && (
          <div>
            <AccordionEngine />
          </div>
        )}
        {!session && (
          <div>
            <AccordionEngine />
          </div>
        )}
      </div>
    </>
  );
};

export default Help;
