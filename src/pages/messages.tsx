import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import NavLayout from "@/components/layout/navLayout";
import { useState } from "react";
import Link from "next/link";
import MessageDashboardConnectionCard from "@/components/messages/messageDashboardConnectionCard";
import DemoConversationTwoCopy from "@/components/messages/demoConversationTwoCopy";
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
          <main className="grid min-h-screen justify-items-center dark:bg-pink-800">
            <div className="w-full rounded border-2 border-gray-200">
              <div className="mx-1 my-1 rounded border-2 border-gray-900">
                <div className="w-full grid-rows-1 rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700">
                  <div className="grid w-full grid-cols-3 gap-0 rounded">
                    <div className="rounded bg-yellow-300">
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
                            className="my-2 mx-1 grid h-16 cursor-pointer grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(2);
                            }}
                            className="my-2 mx-1 grid h-16 cursor-pointer grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(3);
                            }}
                            className="my-2 mx-1 grid h-16 cursor-pointer grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(4);
                            }}
                            className="my-2 mx-1 grid h-16 cursor-pointer grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(5);
                            }}
                            className="my-2 mx-1 grid h-16 cursor-pointer grid-rows-1 content-center overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)] px-1 py-1 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
                          >
                            <MessageDashboardConnectionCard />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        openChat === 1
                          ? "col-span-2 min-h-screen rounded bg-teal-200"
                          : "hidden"
                      }
                    >
                      <div className="flex h-16 w-full items-center justify-around  ">
                        <div className="text-center text-xl font-semibold">
                          John Smith
                        </div>
                      </div>
                      <div className="col-span-5 max-h-screen min-h-screen overflow-scroll">
                        <DemoConversationTwo />
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-300 p-3">
                        {/* <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button> */}
                        {/* <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                        </button> */}

                        <input
                          type="text"
                          placeholder="Message"
                          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700"
                          name="message"
                          required
                        />
                        {/* <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </button> */}
                        <button type="submit">
                          <svg
                            className="h-5 w-5 origin-center rotate-90 transform text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>

                      {/* <div className="flex min-h-screen w-full justify-center rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700">
                        <div className="h-full grid-rows-6 bg-orange-200">
                          <div className="col-span-5 bg-red-100"> */}

                      {/* <div className="text-center text-xl font-semibold">
                          Samuel Duval
                        </div>
                        <div className="overflow-scroll">
                          <DemoConversationTwo />
                        </div> */}

                      {/* </div> */}

                      {/* <div className=" col-span-1 flex items-center">
                          <div className="w-9/12 bg-yellow-200">
                            <input className="px-3text-base h-24 w-full rounded border-0 text-slate-600 placeholder-slate-300 shadow outline-none focus:outline-none focus:ring " />
                          </div>
                          <button className="ml-1 h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-green-200 hover:text-black dark:text-white">
                            Reply
                          </button>
                        </div> */}

                      {/* </div> */}
                      {/* </div> */}
                    </div>

                    <div
                      className={
                        openChat === 2 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div className="h-screen ">
                        <DemoConversationTwoCopy />
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 3 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div className="h-screen ">
                        <DemoConversationTwo />
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 4 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div className="h-screen ">
                        <DemoConversationTwoCopy />
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 5 ? "col-span-2 rounded" : "hidden"
                      }
                    >
                      <div className="h-screen ">
                        <DemoConversationTwo />
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
