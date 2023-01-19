import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import Link from "next/link";
import MessageDashboardConnectionCard from "@/components/messages/messageDashboardConnectionCard";
import DemoConversation from "@/components/messages/demoConversation";
import DemoConversationTwo from "@/components/messages/demoConversationTwo";

const Messages: NextPage = () => {
  const { data: session } = useSession();
  const [openChat, setOpenChat] = useState(1);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <NavLayout />
      <ResponsiveLayout>
        {session && (
          <main className="grid min-h-screen justify-items-center dark:bg-gray-800">
            <div className="w-full rounded border-2 border-gray-200">
              <div className="mx-1 my-1 rounded border-2 border-slate-800">
                <div className="w-full grid-rows-1 rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700">
                  <div className="grid w-full grid-cols-3 gap-0 rounded">
                    <div className="rounded">
                      <div className="flex  h-24 w-full flex-wrap items-center justify-around rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700 md:h-16 lg:h-16">
                        <div>
                          <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-700 dark:text-white"
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
                      <div className="flex min-h-screen w-full justify-center rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700">
                        <div className="my-4 h-screen w-11/12 overflow-scroll rounded bg-[hsl(0,0%,96%)] dark:bg-gray-500">
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(1);
                            }}
                            className="cursor-pointer my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(2);
                            }}
                            className="cursor-pointer my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(3);
                            }}
                            className="cursor-pointer my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(4);
                            }}
                            className="cursor-pointer my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(5);
                            }}
                            className="cursor-pointer my-2 mx-1 grid h-16 grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 1 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div>
                        <div className="h-screen ">
                          <DemoConversation />
                        </div>
                        <div className="inset-x-0 bottom-0">
                          <div className="w-9/12 ">
                            <input className="w-full rounded border-0   bg-red-500 px-3 py-4 text-base text-slate-600 placeholder-slate-300 shadow outline-none focus:outline-none focus:ring " />
                          </div>
                          <button className="h-10  rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-green-200 hover:text-black dark:text-white">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 2 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div className="h-screen ">
                        <DemoConversationTwo />
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 3 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div className="h-screen ">
                        <DemoConversation />
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 4 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div className="h-screen ">
                        <DemoConversationTwo />
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 5 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div className="h-screen ">
                        <DemoConversation />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
        {!session && (
          <main className="justify-top flex min-h-screen flex-col items-center md:justify-center lg:justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="border-slate-800 text-center text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-[5rem]">
                Messages <span className="text-[hsl(280,100%,70%)]">Page</span>
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

export default Messages;
