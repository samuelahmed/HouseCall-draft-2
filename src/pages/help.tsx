import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AccountEditModal from "../components/accountPage/accountEditModal";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import Link from "next/link";
import { useState } from "react";
import SupportDocumentation from "@/components/helpPage/supportDocumentation";
import ContactUs from "@/components/helpPage/contactUs";


const Help: NextPage = () => {
  const { data, isLoading } = trpc.updateAccount.getOne.useQuery();
  const { data: session } = useSession();
  const [openTab, setOpenTab] = useState(1);


  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <NavLayout />
      <ResponsiveLayout>
        <div>
          {session && (
            <div className="grid min-h-screen justify-items-center dark:bg-gray-800">
              <div className="w-11/12 grid-rows-1 rounded bg-gray-100 dark:bg-gray-900">
              <div className="items grid w-full grid-cols-2 justify-items-start gap-0 text-center">
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
                <h1>Documentation</h1>
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
                <h1>Contact Support</h1>
              </div>
            </a>
          </div>
          <div
            className={
              openTab === 1
                ? "block min-h-screen w-11/12 rounded  bg-gray-100  dark:bg-gray-900"
                : "hidden"
            }
            id="link1"
          >
            <SupportDocumentation />
          </div>
          <div
            className={
              openTab === 2
                ? "block min-h-full w-11/12 rounded bg-gray-100  dark:bg-gray-900"
                : "hidden"
            }
            id="link2"
          >
            <ContactUs />
          </div>
              </div>
            </div>
          )}
          {!session && (
          <main className="flex min-h-screen flex-col items-center justify-top md:justify-center lg:justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-[5rem] text-center border-gray-900">
              Help &{" "}
              <span className="text-[hsl(280,100%,70%)]">Support</span>
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
          )}
        </div>
      </ResponsiveLayout>
    </>
  );
};

export default Help;
