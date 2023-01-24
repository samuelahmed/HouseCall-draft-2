import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import AccountEditModal from "@/components/account/accountEditModal";
import { trpc } from "@/utils/trpc";

const Account: NextPage = (props) => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.updateAccount.getOne.useQuery();
  const [openSide, setOpenSide] = useState(0);
  const [openTab, setOpenTab] = useState(1);


  return (
    <>
      <Head>
        <title>Account Settings</title>
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
                      <h1>Manage Account</h1>
                    </div>
                  </a>
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
                  <div className="h-14"></div>
                </div>
                {/* Containers to hold content that get dynamically changed from left-section-menu */}
                <div className="flex flex-row bg-[hsl(0,0%,88%)] dark:bg-gray-700 ">
                  <div className="w-full grid-rows-1 bg-[hsl(0,0%,96%)] dark:bg-gray-800 px-2">
                    <Image
                      className="mt-10 rounded"
                      src={(data && data?.image) || "/cat.jpg"}
                      alt=""
                      width={200}
                      height={200}
                    />
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="">
                        Name:{" "}
                        {isLoading || (data && data?.username) || (
                          <span className="text-red-600">Meow! No Name</span>
                        )}
                      </div>
                      <div className="">
                        Email:{" "}
                        {isLoading ||
                          (data && data?.email) ||
                          <span className="text-red-600">Meow! Something went very wrong.</span>
                          }
                      </div>
                      <div className="">
                        Address:{" "}
                        {isLoading ||
                          (data && data?.address) ||
                          <span className="text-red-600">Meow! Something went very wrong.</span>
                          }
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <AccountEditModal />
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
                  Account{" "}
                  <span className="text-[hsl(280,100%,70%)]">Settings</span>
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

export default Account;
