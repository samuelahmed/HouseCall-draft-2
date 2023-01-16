import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import SearchEngine from "@/components/caregiverDashboard/searchEngine";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { CareSession } from "@prisma/client";

const PatientDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [openTab, setOpenTab] = useState(1);
  const router = useRouter();
  const [items, setItems] = useState<CareSession[]>([]);

  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    medicalNotes: "",
    overview: "",
    title: "",
  });

  useEffect(() => {
    setInputs({
      name: "",
      address: "",
      medicalNotes: "",
      overview: "",
      title: "",
    });
  }, []);

  const { mutate } = trpc.sessionAPIs.createOneSession.useMutation({
    onSuccess(newSession) {
      setItems((prev) => [...prev, newSession]);
      router.push(`/session/${newSession.slug}`);
    },
  });

  const publish = () => {
    mutate(inputs);
  };

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
            >
            
              <h3 className="text-xl font-semibold">Create new Session</h3>
              <input
                type="text"
                value={inputs.title}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
              />
              Name
              <input
                type="text"
                value={inputs.name}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
              />
              Address
              <input
                type="text"
                value={inputs.address}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
              />
              Medical Notes
              <input
                type="text"
                value={inputs.medicalNotes}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    medicalNotes: e.target.value,
                  }))
                }
                className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
              />
              Overview
              <input
                type="text"
                value={inputs.overview}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    overview: e.target.value,
                  }))
                }
                className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
              />
              <div className="grid grid-cols-2 gap-8">
                <button
                  type="button"
                  onClick={() => {
                    console.log("meow");
                  }}
                  className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    publish();
                    // setModalOpen(false);
                  }}
                  className="rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600"
                >
                  Add
                </button>
              </div>
            </div>
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
