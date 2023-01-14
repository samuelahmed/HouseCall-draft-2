import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import SearchEngine from "@/components/caregiverDashboard/searchEngine";
import Link from "next/link";

const PatientDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <NavLayout />
      <Layout>
        {session && (
          <main className="grid min-h-screen justify-items-center dark:bg-gray-800">
            <div className="w-11/12 grid-rows-1 rounded bg-gray-100 dark:bg-gray-900">
              <div className="items grid w-full grid-cols-3 justify-items-start gap-0 text-center">
                <a
                  className={
                    "h-16 w-full " +
                    (openTab === 1
                      ? "bg- text-white" + "-600"
                      : "text-" + "" + "-600 bg-white dark:bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <div className="text-md pb-4 pt-4 md:text-xl">
                    <h1>Create Session</h1>
                  </div>
                </a>
                <a
                  className={
                    "h-16 w-full " +
                    (openTab === 2
                      ? "bg- text-white" + "-600"
                      : "text-" + "-600 bg-white dark:bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <div className="text-md pb-4 pt-4 md:text-xl">
                    <h1>Scheduled Sessions</h1>
                  </div>
                </a>
                <a
                  className={
                    "h-16 w-full " +
                    (openTab === 3
                      ? "bg- text-white" + "-600"
                      : "text-" + "-600 bg-white dark:bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <div className="text-md pb-4 pt-4 md:text-xl">
                    <h1>History</h1>
                  </div>
                </a>
              </div>
            </div>
            {/* NOTE: SHOULD STRUCTURE BE REBUILT SO SEARCH ENGINE IS NOT EMBEDDED HERE?  */}
            <SearchEngine />
            <div
              className={
                openTab === 1
                  ? "block min-h-screen w-11/12 rounded  bg-gray-100  dark:bg-gray-900"
                  : "hidden"
              }
              id="link1"
            ></div>
            <div
              className={
                openTab === 2
                  ? "block min-h-screen w-11/12 rounded bg-gray-100  dark:bg-gray-900"
                  : "hidden"
              }
              id="link2"
            ></div>
            <div
              className={
                openTab === 3
                  ? "block min-h-screen w-11/12 rounded bg-gray-100  dark:bg-gray-900"
                  : "hidden"
              }
              id="link3"
            ></div>
          </main>
        )}
        {!session && (
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Patient{" "}
                <span className="text-[hsl(280,100%,70%)]">Dashboard</span>
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
      </Layout>
    </>
  );
};

export default PatientDashboard;
