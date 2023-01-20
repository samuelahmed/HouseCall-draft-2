import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
// import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import Link from "next/link";
import { useState } from "react";
// import { CareSession } from "@prisma/client";
// import { useRouter } from "next/router";

//   ***********************************************************
//   * This component is only for test purposes.               *
//   * Route should be deleted or protected before production. *
//   ***********************************************************

const Test: NextPage = () => {
  const { data: session } = useSession();
  // const [items, setItems] = useState<CareSession[]>([]);
  // const [modalOpen, setModalOpen] = useState<boolean>(false);
  // const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();
  // const router = useRouter();
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
            <main className="grid min-h-screen grid-cols-3 justify-items-center dark:bg-slate-800 md:grid-cols-6">
              {/***********************
               *   LEFT SECTION        *
               ***********************/}
              <div
                className={
                  openSide === 1 ? "col-span-1 w-full" : "hidden md:block"
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
                    ? "col-span-2 w-full bg-blue-100 md:col-span-4"
                    : "col-span-3 w-full bg-blue-100 md:col-span-4"
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
                  className="md:hidden"
                >
                  Toggle Side
                </button>
                {/* Main content of middle section */}


              </div>
              {/**********************
              * EMPTY RIGHT SECTION  * 
              ***********************/}
              <div className="cols-span-1 hidden w-full bg-orange-100 md:block"></div>
            </main>
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

export default Test;
