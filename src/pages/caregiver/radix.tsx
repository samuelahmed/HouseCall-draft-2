import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../../components/layout/navLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/layout/footer";
import SearchEngine from "@/components/engines/searchEngine";
import FindTab from "@/components/caregiver/findTab";
import HistoryTab from "@/components/caregiver/historyTab";
import ActiveTab from "@/components/caregiver/activeTab";

import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Switch from "@radix-ui/react-switch";
import * as Separator from "@radix-ui/react-separator";

const Caregiver: NextPage = (props) => {
  const { data: session } = useSession();
  const [openSide, setOpenSide] = useState(0);
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <Head>
        <title>Caregiver Dashbaord</title>
      </Head>
      {/* <header className="h-14"></header> */}
      <NavLayout />

      <div>
        {session && (
          <>
            <main
              className="
            grid min-h-95vh grid-cols-1
           bg-blue1
           dark:bg-darkBlue1 
             md:grid-cols-6
            "
            >
              <div
                className="
              col-span-1 hidden min-h-max
             bg-slate12 
             text-olive2
              lg:block 
              "
              >
                MENU
              </div>

              <div
                className="
                col-span-5 min-h-90vh min-w-max
                bg-blue11
                "
              >
                <div
                  className="
                bg-olive11
                "
                >
                  CENTER DIV
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

export default Caregiver;
