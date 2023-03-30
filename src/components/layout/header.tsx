import { useSession } from "next-auth/react";
import ThemeManager from "./themeManager";
import { MenuIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/outline";

import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import AuthShowcase from "./authShowcase";

const Header = ({
  showNav,
  setShowNav,
}: {
  showNav: boolean;
  setShowNav: any;
}) => {
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
      <div className="flex-cols-3 flex items-center justify-between bg-blue12 py-1 md:grid md:grid-cols-3">
        <div className="flex justify-start">
          <div className="md:hidden md:pl-0">
            <MenuIcon
              className="h-8 w-8 cursor-pointer text-darkOlive12"
              onClick={() => setShowNav(!showNav)}
            />
          </div>
          <div className="ml-4 flex items-center pr-4 text-darkOlive12">
            {data?.role === "Caregiver" && (
              <div
                onClick={() => router.push("/dashboard/caregiver/discover")}
                className="hidden text-xl md:block"
              >
                House Call
              </div>
            )}
            {data?.role === "Patient" && (
              <div
                onClick={() => router.push("/dashboard/patient/create")}
                className="hidden text-xl md:block"
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
              onClick={
                () =>
                console.log("search")}
              
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
                // type="search"
                id="default-search"
                className="block w-full border  p-1.5 pl-4 text-sm text-olive12 focus:outline-none focus:ring-1 focus:ring-blue11 bg-blue2 "
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

      {/* NAV BAR (MIDDLE BLUE) OF HEADER */}
      <div className="bg-blue11 py-1 pl-4 text-olive2">

        sadfasf
        
        
        
        
        </div>
      {/* BOTTOM BLUE OF HEADER */}
      <div className="bg-blue2">
        <div className="flex px-1 py-1 text-xl capitalize text-olive12 dark:text-darkOlive12 dark:bg-darkBlue2 justify-center">
          {currentRoute}
        </div>
      </div>
    </>
  );
};
export default Header;
