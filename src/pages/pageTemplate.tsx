import { type NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useState } from "react";
import NavLayout from "../components/layout/navLayout";
import Footer from "@/components/layout/footer";


//   ***********************************************************
//   * This component is only for test purposes.               *
//   * Route should be deleted or protected before production. *
//   ***********************************************************

const PageTemplate: NextPage = () => {
  const { data: session } = useSession();
  const [openSide, setOpenSide] = useState(0);

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <NavLayout />
      <div>
        {session && (
          <>
            <main className="grid min-h-90vh grid-cols-3 justify-items-center bg-[hsl(0,0%,96%)] dark:bg-slate-800 text-gray-800 dark:text-gray-100 lg:grid-cols-6">
              {/***********************
               *   LEFT SECTION        *
               ***********************/}
              <div
                className={
                  openSide === 1 ? "col-span-1 w-full" : "hidden lg:block"
                }
                id="link1"
              >
                {/* Main content of left section */}
              </div>
              {/***********************
               *   MIDDLE SECTION      *
               ***********************/}
              <div
                className={
                  openSide === 1
                    ? "col-span-2 w-full bg-blue-100 lg:col-span-4"
                    : "col-span-3 w-full bg-blue-100 lg:col-span-4"
                }
              >
                <button
                  onClick={() => {
                    if (openSide === 1) {
                      setOpenSide(0);
                    } else {
                      setOpenSide(1);
                    }
                  }}
                  className="lg:hidden"
                >
                  Toggle Side
                </button>
                {/* Main content of middle section */}

              </div>
              {/**********************
               * EMPTY RIGHT SECTION  *
               ***********************/}
              <div className="cols-span-1 hidden w-full bg-orange-100 lg:block "></div>
            </main>
            < Footer />
          </>
        )}
        {!session && (
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Test <span className="text-[hsl(280,100%,70%)]">Page</span>
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
      </div>
    </>
  );
};

export default PageTemplate;
