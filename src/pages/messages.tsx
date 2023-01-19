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
          // START SKELETON TOP
          <main className="grid min-h-90vh grid-rows-5 justify-items-center dark:bg-slate-800 md:grid-rows-6">
            <div className="row-span-5 min-h-90vh w-full rounded border-2 border-gray-200">
              <div className="mx-1 my-1 min-h-90vh rounded border-2 border-gray-900 bg-[hsl(0,0%,88%)] dark:bg-gray-700">
                <div className="w-full grid-rows-1 rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700">
                  {/* END SKELETON TOP */}

                  <div className="grid w-full grid-cols-3 gap-0 rounded dark:bg-gray-700">
                    <div className="py-6">
                      <div className="justify-center text-center">
                        <div className="relative w-full">
                          <select className="dark:bg-gray-800 dark:text-gray-100  rounded-md border bg-[hsl(0,0%,96%)] text-gray-800 shadow-sm outline-none border-gray-900">
                            <option>Caregivers</option>
                            <option>Patients</option>
                          </select>
                        </div>

                      </div>
                      <div className=" py-8max-h-70vh flex min-h-70vh w-full justify-center rounded bg-[hsl(0,0%,88%)] dark:bg-gray-700">
                        <div className="my-4 w-11/12 overflow-scroll rounded bg-[hsl(0,0%,96%)] dark:bg-gray-500">
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenChat(1);
                            }}
                            className="my-2 mx-1 grid h-16 cursor-pointer grid-rows-1 overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)]  hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
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
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 1
                          ? "col-span-2 rounded bg-[hsl(0,0%,88%)] pr-1 dark:bg-gray-700"
                          : "hidden"
                      }
                    >
                      <DemoConversationTwoCopy />
                      <div className="flex items-center justify-between border-gray-300 p-3">
                        <input
                          type="text"
                          placeholder="Message"
                          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          name="message"
                          required
                        />
                        <button type="submit">
                          <svg
                            className="h-5 w-5 origin-center rotate-90 transform text-gray-500 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 2
                          ? "col-span-2 min-h-90vh rounded bg-[hsl(0,0%,88%)] pr-1 dark:bg-gray-700"
                          : "hidden"
                      }
                    >
                      <DemoConversationTwo />
                      <div className="relative flex w-full items-center justify-between border-gray-300 p-3">
                        <input
                          type="text"
                          placeholder="Message"
                          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          name="message"
                          required
                        />
                        <button type="submit">
                          <svg
                            className="h-5 w-5 origin-center rotate-90 transform text-gray-500 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 3
                          ? "col-span-2 rounded bg-[hsl(0,0%,88%)] pr-1 dark:bg-gray-700"
                          : "hidden"
                      }
                    >
                      <DemoConversationTwoCopy />
                      <div className="flex items-center justify-between border-gray-300 p-3">
                        <input
                          type="text"
                          placeholder="Message"
                          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          name="message"
                          required
                        />
                        <button type="submit">
                          <svg
                            className="h-5 w-5 origin-center rotate-90 transform text-gray-500 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 4
                          ? "col-span-2 rounded bg-[hsl(0,0%,88%)] pr-1 dark:bg-gray-700"
                          : "hidden"
                      }
                    >
                      <DemoConversationTwo />
                      <div className="flex items-center justify-between border-gray-300 p-3">
                        <input
                          type="text"
                          placeholder="Message"
                          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          name="message"
                          required
                        />
                        <button type="submit">
                          <svg
                            className="h-5 w-5 origin-center rotate-90 transform text-gray-500 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div
                      className={
                        openChat === 5
                          ? "col-span-2 rounded bg-[hsl(0,0%,88%)] pr-1 dark:bg-gray-700"
                          : "hidden"
                      }
                    >
                      <DemoConversationTwoCopy />
                      <div className="flex items-center justify-between border-gray-300 p-3">
                        <input
                          type="text"
                          placeholder="Message"
                          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          name="message"
                          required
                        />
                        <button type="submit">
                          <svg
                            className="h-5 w-5 origin-center rotate-90 transform text-gray-500 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* START SKELETON BOTTOM */}
                </div>
              </div>
            </div>
          </main>
          // END SKELETON BOTTOM
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
