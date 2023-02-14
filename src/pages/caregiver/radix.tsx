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
                bg-blue1 dark:bg-darkBlue1
                "
              >
                <div
                  className="
                mx-4 mt-4
                grid min-h-90vh
                grid-cols-2
                bg-blue1
                dark:bg-darkBlue1
                gap-x-1	                "
                >
                  <div
                    className="
                    col-span-2
                    md:col-span-1 border
                    border-blue6
                    bg-blue2 dark:bg-darkBlue1
                    dark:border-darkBlue6
                  "
                  >
                    Left Table
                  </div>
                  <div
                    className="
                    hidden md:block
                    md:col-span-1 border
                    border-blue6
                    bg-blue2 dark:bg-darkBlue1
                    dark:border-darkBlue6
                  "
                  >
                    Right Table
                  </div>
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
