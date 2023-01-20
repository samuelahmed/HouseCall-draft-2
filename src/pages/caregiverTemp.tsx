import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/layout/footer";
import SearchEngine from "@/components/caregiver/engines/searchEngine";
import FindTab from "@/components/caregiver/tabs/findTab";
import HistoryTab from "@/components/caregiver/tabs/historyTab";
import ActiveTab from "@/components/caregiver/tabs/activeTab";

const CaregiverTest: NextPage = () => {
  const { data: session } = useSession();
  const [openSide, setOpenSide] = useState(0);
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <NavLayout />
      <div>
        {session && (
          <>
            <main className="grid min-h-90vh grid-cols-3 justify-items-center bg-[hsl(0,0%,96%)] text-gray-800 dark:bg-slate-800 dark:text-gray-100 lg:grid-cols-6">
              {/***********************
               *   LEFT SECTION        *
               ***********************/}
              <div
                className={
                  openSide === 1 ? "col-span-1 w-full" : "hidden lg:block"
                }
                id="link1"
              >
                {/* controls for content displayed in middle sections */}
                <div className="flex flex-col gap-2">
                  <a
                    className={"my-2 ml-4" + (openTab === 1 ? "" : "")}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    <div className="text-md text-gray-800 dark:text-gray-100 md:text-xl">
                      <h1>Find Session</h1>
                    </div>
                  </a>
                  <a
                    className={"my-2 ml-4" + (openTab === 2 ? "" : "")}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    <div className="text-md text-gray-800 dark:text-gray-100 md:text-xl">
                      <h1>Scheduled Sessions</h1>
                    </div>
                  </a>
                  <a
                    className={"my-2 ml-4" + (openTab === 3 ? "" : "")}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                    <div className="text-md text-gray-800 dark:text-gray-100 md:text-xl">
                      <h1>History</h1>
                    </div>
                  </a>
                </div>
              </div>
              {/***********************
               *   MIDDLE SECTION      *
               ***********************/}
              <div
                className={
                  openSide === 1
                    ? "col-span-2 w-full bg-[hsl(0,0%,96%)] dark:bg-slate-800 lg:col-span-4"
                    : "col-span-3 w-full bg-[hsl(0,0%,96%)] dark:bg-slate-800 lg:col-span-4"
                }
              >
 


                {/* Main content of middle section */}
                <div className="flex flex-row">
                <button
                  onClick={() => {
                    if (openSide === 1) {
                      setOpenSide(0);
                    } else {
                      setOpenSide(1);
                    }
                  }}
                  className="lg:hidden"
                >
                  Menu
                </button>

                <SearchEngine />

                </div>
                <div
                  className={
                    openTab === 1
                      ? "block"
                      : "hidden"
                  }
                  id="link1"
                >
                  <FindTab />
                </div>
                <div
                  className={
                    openTab === 2
                      ? "block"
                      : "hidden"
                  }
                  id="link2"
                >
                  <ActiveTab />
                </div>
                <div
                  className={
                    openTab === 3
                      ? "block"
                      : "hidden"
                  }
                  id="link3"
                >
                  <HistoryTab />
                </div>
              </div>
              {/**********************
               * EMPTY RIGHT SECTION  *
               ***********************/}
              <div className="cols-span-1 hidden w-full bg-[hsl(0,0%,96%)] dark:bg-slate-800 lg:block "></div>
            </main>
            <Footer />
          </>
        )}
        {!session && (
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Test <span className="text-[hsl(280,100%,70%)]">Page</span>
              </h1>
              <div className="flex flex-row gap-2">
                <Link href={"/login"} className="rounded border py-1 px-4">
                  Login
                </Link>
                <Link href={"/register"} className="rounded border py-1 px-4">
                  Register
                </Link>
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default CaregiverTest;
