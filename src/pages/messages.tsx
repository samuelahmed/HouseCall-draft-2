import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/layout/footer";
import DemoConversationTwo from "@/components/messages/demoConversationTwo";
import DemoConversationTwoCopy from "@/components/messages/demoConversationTwoCopy";
import MessageDashboardConnectionCard from "@/components/messages/messageDashboardConnectionCard";
import MessageDashboardConnectionCardJohn from "@/components/messages/messageDashboardConnectionCardJohn";

const Messages: NextPage = (props) => {
  const { data: session } = useSession();
  const [openSide, setOpenSide] = useState(0);
  const [openChat, setOpenChat] = useState(1);

  return (
    <>
      <Head>
        <title>Patient Dashboard</title>
      </Head>
      <NavLayout />
      <div>
        {session && (
          <>
            <main className="grid min-h-90vh grid-cols-3 justify-items-center bg-[hsl(0,0%,96%)] text-gray-800 dark:bg-slate-800 dark:text-gray-100 lg:grid-cols-6">
              {/***********************
               *   LEFT SECTION       *
               **********************/}
              <div
                className={
                  openSide === 1 ? "col-span-1 w-full" : "hidden lg:block"
                }
                id="link1"
              >
                {/* controls for content displayed in middle sections */}
                <div className="flex flex-col gap-1">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenChat(1);
                    }}
                    className="my-1 mx-1 grid h-16 cursor-pointer grid-rows-1 overflow-hidden rounded-xl border border-gray-900 bg-[hsl(0,0%,96%)]  hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 md:grid-rows-2 lg:grid-rows-2"
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
                    <MessageDashboardConnectionCardJohn />
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
                    <MessageDashboardConnectionCardJohn />
                  </div>
                </div>
              </div>
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
                  <button
                    onClick={() => {
                      if (openSide === 1) {
                        setOpenSide(0);
                      } else {
                        setOpenSide(1);
                      }
                    }}
                    className="lg:hidden "
                  >
                    <div className={"" + (openSide === 1 ? "hidden" : "")}>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="2em"
                        width="2em"
                        {...props}
                      >
                        <path d="M11 4a4 4 0 010 8H8a4.992 4.992 0 002-4 4.992 4.992 0 00-2-4h3zm-6 8a4 4 0 110-8 4 4 0 010 8zM0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z" />
                      </svg>
                    </div>
                    <div className={"" + (openSide === 1 ? "" : "hidden")}>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="2em"
                        width="2em"
                        {...props}
                      >
                        <path d="M5 3a5 5 0 000 10h6a5 5 0 000-10H5zm6 9a4 4 0 110-8 4 4 0 010 8z" />
                      </svg>
                    </div>
                  </button>
                  {/* {search} */}
                </div>
                {/* Containers to hold content that get dynamically changed from left-section-menu */}

                <div className="flex flex-col gap-2">
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
                        ? "col-span-2 rounded bg-[hsl(0,0%,88%)] pr-1 dark:bg-gray-700"
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
              </div>
              {/************************
               *  EMPTY RIGHT SECTION  *
               ***********************/}
              <div className="cols-span-1 hidden w-full bg-[hsl(0,0%,96%)] dark:bg-slate-800 lg:block "></div>
            </main>
            <Footer />
          </>
        )}
        {!session && (
          <>
            <main className="justify-top flex min-h-90vh flex-col items-center md:justify-center lg:justify-center">
              <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="border-gray-900 text-center text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-[5rem]">
                  Messages{" "}
                  <span className="text-[hsl(280,100%,70%)]">Page</span>
                </h1>
                <div className="flex flex-row gap-2">
                  <Link href={"/login"} className="rounded border py-1 px-4">
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

export default Messages;
