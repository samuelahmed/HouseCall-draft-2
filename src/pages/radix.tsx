import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
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
import * as Separator from '@radix-ui/react-separator';


const Caregiver: NextPage = (props) => {
  const { data: session } = useSession();
  const [openSide, setOpenSide] = useState(0);
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <Head>
        <title>Caregiver Dashbaord</title>
      </Head>
      <NavLayout />
      <div>
        {session && (
          <>
            <main className=" min-h-90vh  bg-[hsl(0,0%,96%)] text-gray-800 dark:bg-slate-800 dark:text-gray-100">
              {/***********************
               *   LEFT SECTION        *
               ***********************/}
              <Tabs.Root defaultValue="tab1" orientation="vertical">

              <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
      <div className="Text">Blog</div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 15px' }}
      />
      <div className="Text">Docs</div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 15px' }}
      />
      <div className="Text">Source</div>
    </div>

                  <Tabs.List
                    className="flex flex-row gap-2"
                    aria-label="tabs example"
                  >
                    <Tabs.Trigger
                      className="text-md text-gray-800 dark:text-gray-100 md:text-xl"
                      value="tab1"
                    >
                      Find Session
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="text-md text-gray-800 dark:text-gray-100 md:text-xl"
                      value="tab2"
                    >
                      Active Sessions
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="text-md text-gray-800 dark:text-gray-100 md:text-xl"
                      value="tab3"
                    >
                      History
                    </Tabs.Trigger>
                  </Tabs.List>

                {/************************
                 *   MIDDLE SECTION      *
                 ***********************/}
                <div
                  className={
                    openSide === 1
                      ? "col-span-2 w-full bg-[hsl(0,0%,96%)] dark:bg-slate-800 lg:col-span-4"
                      : "col-span-3 w-full bg-[hsl(0,0%,96%)] dark:bg-slate-800 lg:col-span-4"
                  }
                >
                  {/* Container to toggle left-section-menu and hold search-bar */}
                  <div className="flex flex-row bg-[hsl(0,0%,88%)] pl-0.5 dark:bg-gray-700">
                    <Switch.Root
                      className="SwitchRoot lg:hidden "
                      id="toggle-menu"
                      onClick={() => {
                        if (openSide === 1) {
                          setOpenSide(0);
                        } else {
                          setOpenSide(1);
                        }
                      }}
                      // className="lg:hidden "
                    >
                      <Switch.Thumb className="SwitchThumb" />
                    </Switch.Root>

                    <SearchEngine />
                  </div>
                </div>
                <Tabs.Content value="tab1">
                  <FindTab />
                </Tabs.Content>
                <Tabs.Content value="tab2">
                  <ActiveTab />
                </Tabs.Content>
                <Tabs.Content value="tab3">
                  <HistoryTab />
                </Tabs.Content>
                {/************************
                 *  EMPTY RIGHT SECTION  *
                 ***********************/}
                <div className="cols-span-1 hidden w-full bg-[hsl(0,0%,96%)] dark:bg-slate-800 lg:block "></div>
              </Tabs.Root>
            </main>
            <Footer />
          </>
        )}
        {!session && (
          <>
            <main className="justify-top flex min-h-90vh flex-col items-center md:justify-center lg:justify-center">
              <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="border-gray-900 text-center text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-[5rem]">
                  Caregiver{" "}
                  <span className="text-[hsl(280,100%,70%)]">Dashboard</span>
                </h1>
                <div className="flex flex-row gap-2">
                  <Link href={"/signin"} className="rounded border py-1 px-4">
                    Sign in
                  </Link>
                  <Link href={"/register"} className="rounded border py-1 px-4">
                    Register
                  </Link>
                </div>
              </div>
            </main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Caregiver;
