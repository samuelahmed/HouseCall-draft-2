import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const SideNav = () => { 
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();
  const { data: session } = useSession();
  return (
    <>
      {session && user?.role === "Caregiver" && (
        <>
          <div className="absolute z-50 col-span-1 bg-blue11 text-olive2 dark:bg-darkBlue2 lg:block">
            <div className="border-1 flex flex-col items-baseline divide-y border border-t-0 border-blue12 dark:border-darkBlue1">
              <Link
                href={"/dashboard/caregiver/discover"}
                className="flex w-full flex-row items-center px-1 py-1"
              >
                <div className="w-full px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                  Discover
                </div>
              </Link>
              <Link
                href={"/dashboard/caregiver/applied"}
                className="flex w-full flex-row items-center px-1 py-1"
              >
                <div className="w-full px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                  Applied
                </div>
              </Link>
              <Link
                href={"/dashboard/caregiver/scheduled"}
                className="flex w-full flex-row items-center px-1 py-1"
              >
                <div className="w-full px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                  Scheduled
                </div>
              </Link>
              <Link
                href={"/dashboard/caregiver/history"}
                className="flex w-full flex-row items-center px-1 py-1"
              >
                <div className="hover:outline-blue w-full px-2 hover:outline hover:outline-2 active:bg-blue5 active:text-darkOlive2">
                  History
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {session && user?.role === "Patient" && (
        <>
          <div className="absolute z-50 col-span-1 bg-blue11 text-olive2 dark:bg-darkBlue2 lg:block">
            <div className="border-1 flex flex-col items-baseline divide-y border border-t-0 border-blue12 dark:border-darkBlue1">
              <Link
                href={"/dashboard/patient/create"}
                className="flex w-full flex-row items-center px-1 py-1"
              >
                <div className="w-full px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                  Create
                </div>
              </Link>
              <Link
                href={"/dashboard/patient/sessions"}
                className="flex w-full flex-row items-center px-1 py-1"
              >
                <div className="w-full px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                  New
                </div>
              </Link>
              <Link
                href={"/dashboard/patient/scheduled"}
                className="flex w-full flex-row items-center px-1 py-1"
              >
                <div className="w-full px-2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2">
                  Scheduled
                </div>
              </Link>
              <Link
                href={"/dashboard/patient/history"}
                className="flex w-full flex-row items-center px-1 py-1"
              >
                <div className="hover:outline-blue w-full px-2 hover:outline hover:outline-2 active:bg-blue5 active:text-darkOlive2">
                  History
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {!session && (
        <>{/* if user has no session they cannot access this menu */}</>
      )}
    </>
  );
};

export default SideNav;
