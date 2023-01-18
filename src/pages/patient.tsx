import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import SearchEngine from "@/components/caregiverDashboard/engines/searchEngine";
import Link from "next/link";
import CreateSession from "@/components/patientDashboard/createSession";

const PatientDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [openTab, setOpenTab] = useState(1);
  let search;
  if (openTab !== 1) {
    search = <SearchEngine />;
  } else {
    search = <></>;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <NavLayout />
      <ResponsiveLayout>
        {session && (
          <main className="grid min-h-screen justify-items-center dark:bg-slate-800">
            <div className="w-full rounded border-2 border-gray-200">
              <div className="mx-1 my-1 rounded border-2 border-gray-900 pt-1">
                <div className="grid-rows-1 rounded bg-gray-100 pr-1 pl-1 pb-1 dark:bg-slate-800">
                  <div className="items grid w-full grid-cols-3 justify-items-start gap-0 text-center">
                    <a
                      className={
                        "h-16 w-full " +
                        (openTab === 1
                          ? "bg-[hsl(0,0%,88%)] dark:bg-gray-700"
                          : "bg-[hsl(0,0%,96%)] dark:bg-slate-800")
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
                          ? "bg-[hsl(0,0%,88%)] dark:bg-gray-700"
                          : "bg-[hsl(0,0%,96%)] dark:bg-slate-800")
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
                        <h1>Active Sessions</h1>
                      </div>
                    </a>
                    <a
                      className={
                        "h-16 w-full " +
                        (openTab === 3
                          ? "bg-[hsl(0,0%,88%)] dark:bg-gray-700"
                          : "bg-[hsl(0,0%,96%)] dark:bg-slate-800")
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
                {search}
                <div
                  className={
                    openTab === 1
                      ? "block min-h-screen rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700 mx-1 mb-1"
                      : "hidden"
                  }
                  id="link1"
                >
                  <CreateSession />
                </div>
                <div
                  className={
                    openTab === 2
                      ? "block min-h-screen rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700  mx-1 mb-1"
                      : "hidden"
                  }
                  id="link2"
                >
                  Render Session that were created by the session user ID
                </div>
                <div
                  className={
                    openTab === 3
                      ? "block min-h-screen rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700  mx-1 mb-1"
                      : "hidden"
                  }
                  id="link3"
                ></div>
              </div>
            </div>
          </main>
        )}
        {!session && (
          <main className="justify-top flex min-h-screen flex-col items-center md:justify-center lg:justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="border-gray-900 text-center text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-[5rem]">
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
      </ResponsiveLayout>
    </>
  );
};

export default PatientDashboard;
