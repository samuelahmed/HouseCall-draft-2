import { useSession } from "next-auth/react";
import ThemeManager from "./themeManager";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import AuthShowcase from "./authShowcase";
import Link from "next/link";
import SideNav from "./sideNav";
import { useState } from "react";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const { data: session } = useSession();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();
  const router = useRouter();

  const endRoute1 =
    router.pathname.split("/")[router.pathname.split("/").length - 1];
  const endRoute2 =
    router.pathname.split("/")[router.pathname.split("/").length - 2];
  let currentRoute = endRoute1;
  if (endRoute1 === "[slug]" && endRoute2 === "careSession") {
    currentRoute = "Care Session";
  }
  if (endRoute1 === "[slug]" && endRoute2 === "caregiver") {
    currentRoute = "Caregiver";
  }

  return (
    <>
      {/* TODO: Fix the mobile so that it reaches across entire screen not only 2/3rds */}
      <div className="flex-cols-3 flex items-center justify-between bg-blue12 py-1 dark:bg-darkBlue1 md:grid md:grid-cols-3">
        <div className="flex justify-start">
          <div className="ml-4 flex items-center pr-4 text-darkOlive12">
            {data?.role === "Caregiver" && (
              <div
                onClick={() => router.push("/dashboard")}
                className="hidden cursor-pointer text-sm md:block md:text-xl"
              >
                House Call
              </div>
            )}
            {data?.role === "Patient" && (
              <div
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer text-xs md:block md:text-xl"
              >
                House Call
              </div>
            )}
          </div>
        </div>
        <div className="flex px-1 text-xl capitalize text-darkOlive12 md:justify-center">
          <form className="min-w-full">
            <div className="relative ">
              <div
                className="absolute right-2 bottom-2"
                onClick={() => console.log("search")}
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-olive12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                id="default-search"
                className="block w-full border  bg-blue2 p-1.5 pl-4 text-sm text-olive12 focus:outline-none focus:ring-1 focus:ring-blue11 "
                placeholder="Search Sessions"
                required
              />
            </div>
          </form>
        </div>
        <div className="flex justify-end ">
          <div className="hidden items-center text-darkOlive12 md:flex">
            {session &&
              (isLoading || (data && data?.username) || (
                <span className="">Meow! No Name</span>
              ))}
          </div>
          <ThemeManager />
          <AuthShowcase />
        </div>
      </div>

      {/* HORIZONTAL NAV BAR (MIDDLE BLUE) OF HEADER */}
      <div className="min-w-full bg-blue11  text-olive2 dark:bg-darkBlue2">
        {session && data?.role === "Caregiver" && (
          <div className="flex flex-row items-center divide-x overflow-auto border border-t-0 border-r-0 border-l-0 border-blue12 pl-1 dark:border-darkBlue1">
            <div
              className=" flex cursor-pointer flex-row items-center py-1 px-1"
              onClick={() => setShowNav(!showNav)}
            >
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Sessions
              </div>
            </div>
            <Link href={"/dashboard/messages"} className="px-1 py-1 ">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Messages
              </div>
            </Link>
            <Link href={"/dashboard/account"} className="px-1 py-1">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Account
              </div>
            </Link>
            <Link href={"/help"} className="px-1 py-1">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Help
              </div>
            </Link>
          </div>
        )}
        {session && data?.role === "Patient" && (
          <div className="flex flex-row items-center divide-x overflow-auto border border-t-0 border-r-0 border-l-0 border-blue12 pl-1 dark:border-darkBlue1">
            <div
              className=" flex cursor-pointer flex-row items-center py-1 px-1"
              onClick={() => setShowNav(!showNav)}
            >
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Sessions
              </div>{" "}
            </div>
            <Link href={"/dashboard/messages"} className="px-1 py-1 ">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Messages
              </div>
            </Link>
            <Link href={"/dashboard/account"} className="px-1 py-1">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Account
              </div>
            </Link>
            <Link href={"/help"} className="px-1 py-1">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Help
              </div>
            </Link>
          </div>
        )}
        {!session && (
          <div className="flex flex-row items-center divide-x overflow-auto border border-t-0 border-r-0 border-l-0 border-blue12 pl-1 dark:border-darkBlue1">
            <Link href={"/login"} className="px-1 py-1 ">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Login
              </div>
            </Link>
            <Link href={"/register"} className="px-1 py-1 ">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Register
              </div>
            </Link>
            <Link href={"/help"} className="px-1 py-1">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                Help
              </div>
            </Link>
          </div>
        )}
      </div>
      {/* BOTTOM BLUE OF HEADER */}
      <div className={`${showNav ? "" : "hidden"}`}>
        <SideNav />
      </div>
      <div className="min-w-full bg-blue2">
        <div className="flex justify-center px-1 py-1 text-xl capitalize text-olive12 dark:bg-darkBlue3 dark:text-darkOlive12">
          {currentRoute}
        </div>
      </div>
    </>
  );
};
export default Header;
