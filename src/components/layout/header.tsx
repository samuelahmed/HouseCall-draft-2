import { useSession } from "next-auth/react";
import ThemeManager from "./themeManager";
import { MenuIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/outline";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import AuthShowcase from "./authShowcase";
import Link from "next/link";

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
      {/* TODO: Fix the mobile so that it reaches across entire screen not only 2/3rds */}
      <div className="flex-cols-3 flex items-center justify-between bg-blue12 py-1 md:grid md:grid-cols-3">
        <div className="flex justify-start">
          <div className="md:hidden md:pl-0 ">
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
                // type="search"
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

      {/* NAV BAR (MIDDLE BLUE) OF HEADER */}
      <div className="min-w-full bg-blue11 py-1 pl-4 text-olive2">
        {data?.role === "Caregiver" && (
          <div className="flex flex-row items-baseline space-x-3">
            <Link
              href={"/dashboard/caregiver/discover"}
              className="flex flex-row items-center"
            >
              {/* <FaceIcon className="mr-2" /> */}
              Discover
            </Link>
            <Link
              href={"/dashboard/caregiver/applied"}
              className="flex flex-row items-center"
            >
              {/* <IdCardIcon className="mr-2" /> */}
              Applied
            </Link>

            <Link
              href={"/dashboard/caregiver/scheduled"}
              className="flex flex-row items-center"
            >
              {/* <CalendarIcon className="mr-2" /> */}
              Scheduled
            </Link>

            <Link
              href={"/dashboard/caregiver/history"}
              className="flex flex-row items-center"
            >
              {/* <ArchiveIcon className="mr-2" /> */}
              History
            </Link>
            <Link
              href={"/dashboard/messages"}
              className="flex flex-row items-center"
            >
              {/* <ChatBubbleIcon className="mr-2" /> */}
              Messages
            </Link>
            <Link
              href={"/dashboard/account"}
              className="flex flex-row items-center"
            >
              {/* <PersonIcon className="mr-2" /> */}
              Account
            </Link>
            <Link href={"/help"} className="flex flex-row items-center">
              {/* <QuestionMarkIcon className="mr-2" /> */}
              Help
            </Link>
          </div>
        )}
        {data?.role === "Patient" && (
          <div className="flex flex-row  space-x-4 items-center">
            <MenuIcon
              className="h-8 w-8 cursor-pointer text-darkOlive12"
              onClick={() => setShowNav(!showNav)}
            />
            <div className="" onClick={() => setShowNav(!showNav)}>
              Sessions
            </div>
            <Link
              href={"/dashboard/messages"}
              className="flex flex-row items-center"
            >
              {/* <ChatBubbleIcon className="mr-2" /> */}
              Messages
            </Link>
            <Link
              href={"/dashboard/account"}
              className="flex flex-row items-center"
            >
              {/* <QuestionMarkIcon className="mr-2" /> */}
              Account
            </Link>
            <Link href={"/help"} className="flex flex-row items-center">
              {/* <QuestionMarkIcon className="mr-2" /> */}
              Help
            </Link>
          </div>
        )}
      </div>
      {/* BOTTOM BLUE OF HEADER */}
      <div className="min-w-full bg-blue2">
        <div className="flex justify-center px-1 py-1 text-xl capitalize text-olive12 dark:bg-darkBlue2 dark:text-darkOlive12">
          {currentRoute}
        </div>
      </div>
    </>
  );
};
export default Header;
