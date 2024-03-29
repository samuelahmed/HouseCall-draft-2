import { useSession } from "next-auth/react";
import ThemeManager from "./themeManager";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import AuthShowcase from "./authShowcase";
import Link from "next/link";
import SideNav from "./sideNav";
import { useState } from "react";
import DataTable from "../search/searchDataTable";

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
      <div className="flex-cols-3 flex items-center justify-between bg-blue12 py-1 dark:bg-darkBlue1 md:grid md:grid-cols-3">
        <div className="flex justify-start">
          <div className="ml-4 flex items-center pr-4 text-darkOlive12">
            {session && data?.role === "Caregiver" && (
              <div
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer text-sm md:block md:text-xl"
              >
                House Call
              </div>
            )}
            {session && data?.role === "Patient" && (
              <div
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer text-xs md:block md:text-xl"
              >
                House Call
              </div>
            )}

            {!session && (
              <div
                onClick={() => router.push("/")}
                className="cursor-pointer text-xs md:block md:text-xl"
              >
                House Call
              </div>
            )}
          </div>
        </div>

        {session && (
          <div className="px-1 text-xl capitalize text-darkOlive12 md:justify-center">
            <form className="min-w-full">
              <div className="relative">
                <DataTable />
              </div>
            </form>
          </div>
        )}
        {!session && (
          <div className="flex">{/* Hide search bar if not logged in */}</div>
        )}

        <div className="flex justify-end ">
          <div className="hidden items-center text-darkOlive12 md:flex">
            {session &&
              (isLoading || (data && data?.username) || (
                <span className="text-red11">Error! No Name</span>
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
            <Link href={"/about"} className="px-1 py-1">
              <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                About
              </div>
            </Link>
          </div>
        )}
      </div>
      {/* BOTTOM BLUE OF HEADER */}
      <div className={`${showNav ? "" : "hidden"}`}>
        <SideNav />
      </div>
      {session && (
        <div className="min-w-full bg-blue2">
          <div className="flex justify-center px-1 py-1 text-xl capitalize text-olive12 dark:bg-darkBlue3 dark:text-darkOlive12">
            {currentRoute}
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
