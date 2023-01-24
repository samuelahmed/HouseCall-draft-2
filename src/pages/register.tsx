import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { useState } from "react";
import Footer from "@/components/layout/footer";
import LoginForm from "@/components/forms/loginForm";
import RegisterForm from "@/components/forms/registerForm";

const Register: NextPage = (props) => {
  const [openSide, setOpenSide] = useState(0);
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <NavLayout />
      <div>
        <main className="grid min-h-90vh grid-cols-3 justify-items-center bg-[hsl(0,0%,96%)] text-gray-800 dark:bg-slate-800 dark:text-gray-100 lg:grid-cols-6">
          {/***********************
           *   LEFT SECTION       *
           **********************/}
          <div
            className={openSide === 1 ? "col-span-1 w-full" : "hidden lg:block"}
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
                  <h1>Register</h1>
                </div>
              </a>
              <a
                className={"my-2 ml-4" + (openTab === 1 ? "" : "")}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <div className="text-md text-gray-800 dark:text-gray-100 md:text-xl">
                  <h1>Sign in</h1>
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
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <div className="flex flex-row bg-[hsl(0,0%,88%)] dark:bg-gray-700 ">
                <div className="w-full grid-rows-1 bg-[hsl(0,0%,96%)] px-2 dark:bg-gray-800 ">
                  <div className="mt-10">
                  <RegisterForm />

                  </div>
                </div>
              </div>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <div className="flex flex-row bg-[hsl(0,0%,88%)] dark:bg-gray-700 ">
                <div className="w-full grid-rows-1 bg-[hsl(0,0%,96%)] px-2 dark:bg-gray-800 ">
                  <div className="mt-10">
                  <LoginForm />
                  </div>
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
      </div>
    </>
  );
};

export default Register;
