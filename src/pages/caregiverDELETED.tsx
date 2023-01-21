import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import SearchEngine from "@/components/caregiver/engines/searchEngine";
import HistoryTab from "@/components/caregiver/tabs/historyTab";
import ActiveTab from "@/components/caregiver/tabs/activeTab";
import FindTab from "@/components/caregiver/tabs/findTab";
import Link from "next/link";

const Caregiver: NextPage = () => {
  const { data: session } = useSession();
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <NavLayout />
      <ResponsiveLayout>
        {session && (
          <>
            <main className="grid h-screen grid-rows-5 md:grid-rows-6 justify-items-center dark:bg-slate-800">
              <div className="row-span-5 w-full rounded border-2 border-gray-200 pb-2">
                <div className="mx-1 my-1 h-full rounded border-2 border-gray-900">
                  <div className=" grid-rows-1 rounded  bg-gray-100 dark:bg-gray-800">
                    <div className=" items grid w-full grid-cols-3 justify-items-start gap-0 px-1 pb-1 text-center">
                      <a
                        className={
                          "h-16 w-full " +
                          (openTab === 1
                            ? "mt-1 rounded-t  bg-[hsl(0,0%,88%)] dark:bg-gray-700"
                            : "mt-1 bg-[hsl(0,0%,96%)]  dark:bg-slate-800")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                      >
                        <div className="text-md pb-4 pt-4 text-gray-800 dark:text-gray-100 md:text-xl">
                          <h1>Find Session</h1>
                        </div>
                      </a>
                      <a
                        className={
                          "h-16 w-full " +
                          (openTab === 2
                            ? "mt-1 rounded-t bg-[hsl(0,0%,88%)] dark:bg-gray-700"
                            : "mt-1 bg-[hsl(0,0%,96%)] dark:bg-slate-800")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                      >
                        <div className="text-md pb-4 pt-4 text-gray-800 dark:text-gray-100 md:text-xl">
                          <h1>Scheduled Sessions</h1>
                        </div>
                      </a>
                      <a
                        className={
                          "h-16 w-full " +
                          (openTab === 3
                            ? "mt-1 rounded-t bg-[hsl(0,0%,88%)] dark:bg-gray-700"
                            : "mt-1 bg-[hsl(0,0%,96%)] dark:bg-slate-800")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(3);
                        }}
                        data-toggle="tab"
                        href="#link3"
                        role="tablist"
                      >
                        <div className="text-md pb-4 pt-4 text-gray-800 dark:text-gray-100 md:text-xl">
                          <h1>History</h1>
                        </div>
                      </a>
                    </div>
                  </div>
                  <SearchEngine />
                  <div
                    className={
                      openTab === 1
                        ? "block  w-full rounded  bg-gray-100  dark:bg-gray-800"
                        : "hidden"
                    }
                    id="link1"
                  >
                    <FindTab />
                  </div>
                  <div
                    className={
                      openTab === 2
                        ? "block  w-full rounded bg-gray-100  dark:bg-gray-800 "
                        : "hidden"
                    }
                    id="link2"
                  >
                    <ActiveTab />
                  </div>
                  <div
                    className={
                      openTab === 3
                        ? "block  w-full rounded bg-gray-100  dark:bg-gray-800"
                        : "hidden"
                    }
                    id="link3"
                  >
                    <HistoryTab />
                  </div>
                </div>
                <div className="row-spawn-1 bg-pink-100 collapse">sadfasf</div>
              </div>
            </main>
          </>
        )}
        {!session && (
          <main className="justify-top flex min-h-screen flex-col items-center md:justify-center lg:justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="border-gray-900 text-center text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-[5rem]">
                Caregiver{" "}
                <span className="text-[hsl(280,100%,70%)]">Dashboard</span>
              </h1>
              <div className="flex flex-row gap-2">
                <Link href={"/login"} className="rounded border py-1 px-4">
                  Sign
                </Link>
                <Link href={"/register"} className="rounded border py-1 px-4">
                  Register
                </Link>
              </div>
            </div>
          </main>
        )}
      </ResponsiveLayout>
    </>
  );
};

export default Caregiver;
