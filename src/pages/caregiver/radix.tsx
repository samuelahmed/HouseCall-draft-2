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
import SideNav from "@/components/layout/sideNav";

import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Switch from "@radix-ui/react-switch";
import * as Separator from "@radix-ui/react-separator";

import { ChatBubbleIcon, FaceIcon, PersonIcon, CalendarIcon, IdCardIcon, ArchiveIcon, QuestionMarkIcon } from "@radix-ui/react-icons";

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
               col-span-1 hidden
              min-h-max bg-slate12 
             text-olive2 
             md:flex
              lg:block 
              "
              >
                <div
                  className="
                  flex flex-col items-baseline space-y-2 pl-8 pt-4 text-lg
                "
                >
                  <Link href={"/help"} className="flex flex-row items-center">
                    <FaceIcon className="mr-2" />
                    Discover
                  </Link>
                  <Link href={"/help"} className="flex flex-row items-center">
                    <IdCardIcon className="mr-2" />
                    Applied
                  </Link>

                  <Link href={"/help"} className="flex flex-row items-center">
                    <CalendarIcon className="mr-2" />
                    Scheduled
                  </Link>
                  
                  <Link href={"/help"} className="flex flex-row items-center">
                    <ArchiveIcon className="mr-2" />
                    History
                  </Link>

                  <Link href={"/help"} className="flex flex-row items-center">
                    <ChatBubbleIcon className="mr-2" />
                    Messages
                  </Link>
                  <Link href={"/help"} className="flex flex-row items-center">
                    <PersonIcon className="mr-2" />
                    Account
                  </Link>
                  <Link href={"/help"} className="flex flex-row items-center">
                    <QuestionMarkIcon className="mr-2" />
                    Help
                  </Link>
                </div>
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
                gap-x-1
                bg-blue1
                dark:bg-darkBlue1	                "
                >
                  <div
                    className="
                    col-span-2
                    border border-blue6
                    bg-blue2
                    dark:border-darkBlue6 dark:bg-darkBlue1
                    md:col-span-1
                  "
                  >
                    Left Table
                  </div>
                  <div
                    className="
                    hidden border
                    border-blue6 bg-blue2
                    dark:border-darkBlue6
                    dark:bg-darkBlue1 md:col-span-1
                    md:block
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
