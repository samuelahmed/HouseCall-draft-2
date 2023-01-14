import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import Link from "next/link";
import MessageDashboardConnectionCard from "@/components/messagesPage/messageDashboardConnectionCard";
import DemoConversation from "@/components/messagesPage/demoConversation";
import DemoConversationTwo from "@/components/messagesPage/demoConversationTwo";

const Messages: NextPage = () => {
  const { data: session } = useSession();
  const [openChat, setOpenChat] = useState(1);

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
              <div className="grid w-full grid-cols-3 gap-0 rounded">
                <div className="rounded">
                  <div className="flex  h-24 w-full flex-wrap items-center justify-around rounded bg-gray-100 dark:bg-gray-900 md:h-16 lg:h-16">
                    <div>
                      <input
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white"
                        id="grid-city"
                        type="text"
                        placeholder="Search"
                      />
                    </div>
                    <div>
                      <button className="h-10  rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-green-200 hover:text-black dark:text-white">
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="flex min-h-screen w-full justify-center rounded bg-gray-100 dark:bg-gray-900">
                    <div className="my-4 h-screen w-11/12 overflow-scroll rounded bg-gray-200 dark:bg-slate-800">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenChat(1);
                        }}
                        className="my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border bg-white px-1 py-1 hover:bg-gray-100 dark:bg-sky-900 md:grid-rows-2 lg:grid-rows-2 "
                      >
                        <MessageDashboardConnectionCard />
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenChat(2);
                        }}
                        className="my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border bg-white px-1 py-1 hover:bg-gray-100 dark:bg-sky-900 md:grid-rows-2 lg:grid-rows-2 "
                      >
                        <MessageDashboardConnectionCard />
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenChat(3);
                        }}
                        className="my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border bg-white px-1 py-1 hover:bg-gray-100 dark:bg-sky-900 md:grid-rows-2 lg:grid-rows-2 "
                      >
                        <MessageDashboardConnectionCard />
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenChat(4);
                        }}
                        className="my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border bg-white px-1 py-1 hover:bg-gray-100 dark:bg-sky-900 md:grid-rows-2 lg:grid-rows-2 "
                      >
                        <MessageDashboardConnectionCard />
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenChat(5);
                        }}
                        className="my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border bg-white px-1 py-1 hover:bg-gray-100 dark:bg-sky-900 md:grid-rows-2 lg:grid-rows-2 "
                      >
                        <MessageDashboardConnectionCard />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    openChat === 1
                      ? "col-span-2 rounded bg-gray-100 dark:bg-gray-900"
                      : "hidden"
                  }
                >
                  <div>
                    <div className="h-screen ">
                      <DemoConversation />
                    </div>
                    <div className="flex justify-items-center">
                      <div className="w-9/12 ">
                        <input className="w-full rounded border-0   bg-white px-3 py-4 text-base text-slate-600 placeholder-slate-300 shadow outline-none focus:outline-none focus:ring " />
                      </div>
                      <button className="h-10  rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-green-200 hover:text-black dark:text-white">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    openChat === 2
                      ? "col-span-2 rounded bg-gray-100 dark:bg-gray-900"
                      : "hidden"
                  }
                >
                  <DemoConversationTwo />
                </div>
                <div
                  className={
                    openChat === 3
                      ? "col-span-2 rounded bg-gray-100 dark:bg-gray-900"
                      : "hidden"
                  }
                >
                  <DemoConversation />
                </div>
                <div
                  className={
                    openChat === 4
                      ? "col-span-2 rounded bg-gray-100 dark:bg-gray-900"
                      : "hidden"
                  }
                >
                  <DemoConversationTwo />
                </div>
                <div
                  className={
                    openChat === 5
                      ? "col-span-2 rounded bg-gray-100 dark:bg-gray-900"
                      : "hidden"
                  }
                >
                  <DemoConversation />
                </div>
              </div>
            </div>
          </main>
        )}
        {!session && (
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Messages{" "}
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

export default Messages;
