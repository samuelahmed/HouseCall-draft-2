import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const SideNav = () => {
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();
  const { data: session } = useSession();
  return (
    <>
      {session && user?.address && user?.role === "Caregiver" && (
        <>
          <div
            className="
              fixed col-span-1 min-h-95vh min-w-40vw
             max-w-sm 
             bg-slate12
              text-olive2 
              lg:block
              "
          >
            MENU
            <Link
              href={"/help"}
              className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
            >
              Help
            </Link>
          </div>

          {/* <div className="fixed z-30 ml-0.5 w-64 shadow-sm">
            <div className="dark:bg-gray-700 fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] text-lg md:text-lg xl:text-xl">
              <Link
                href={"/caregiver"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Caregiver Dashboard asdfsdf
              </Link>
              <Link
                href={"/messages"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Messages
              </Link>
              <Link
                href={"/account"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Account
              </Link>
              <Link
                href={"/help"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Help
              </Link>
            </div>
          </div> */}
        </>
      )}
      {session && user?.address && user?.role === "Patient" && (
        <>
          <div className="fixed z-30 ml-0.5 w-64 shadow-sm">
            <div className="dark:bg-gray-700 fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] text-lg md:text-lg xl:text-xl">
              <Link
                href={"/patient"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Patient Dashboard
              </Link>
              <Link
                href={"/messages"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Messages
              </Link>
              <Link
                href={"/account"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Account
              </Link>
              <Link
                href={"/help"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Help
              </Link>
            </div>
          </div>
        </>
      )}
      {session && user?.address && user?.role === "Caregiver & Patient" && (
        <>
          <div className="fixed z-30 ml-0.5 w-64 shadow-sm">
            <div className="dark:bg-gray-700 fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] text-lg md:text-lg xl:text-xl">
              <Link
                href={"/caregiver"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Caregiver Dashboard
              </Link>
              <Link
                href={"/patient"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Patient Dashboard
              </Link>
              <Link
                href={"/messages"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Messages
              </Link>
              <Link
                href={"/account"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Account
              </Link>
              <Link
                href={"/help"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Help
              </Link>
            </div>
          </div>
        </>
      )}
      {((session && !user?.role) || (session && !user?.address)) && (
        <>
          <div className="fixed z-30 ml-0.5 w-64 shadow-sm">
            <div className="dark:bg-gray-700 fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] text-lg md:text-lg xl:text-xl">
              <Link
                href={"/account"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Account
              </Link>
              <Link
                href={"/help"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Help
              </Link>
            </div>
          </div>
        </>
      )}
      {!session && (
        <>
          <div className="fixed z-30 ml-0.5 w-64 shadow-sm">
            <div className="dark:bg-gray-700 fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] text-lg md:text-lg xl:text-xl">
              <Link
                href={"/help"}
                className=" border-gray-200 dark:border-gray-800 border  py-1 px-4"
              >
                Help
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideNav;
