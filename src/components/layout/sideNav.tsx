import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const SideNav = () => {
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();
  const { data: session } = useSession();
  return (
    <>
      {(session && data?.role === 'Caregiver') && (
        <>
          <div className="fixed z-30 ml-0.5 w-64 shadow-sm">
            <div className="fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] text-lg dark:bg-gray-700 md:text-lg xl:text-xl">
              <Link
                href={"/caregiver"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Caregiver Dashboard
              </Link>
              <Link
                href={"/messages"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Messages
              </Link>
              <Link
                href={"/account"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Account
              </Link>
              <Link
                href={"/help"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Help
              </Link>
            </div>
          </div>
        </>
      )}
      {(session && data?.role === 'Patient') && (
        <>
          <div className="fixed z-30 ml-0.5 w-64 shadow-sm">
            <div className="fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] text-lg dark:bg-gray-700 md:text-lg xl:text-xl">
              <Link
                href={"/patient"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Patient Dashboard
              </Link>
              <Link
                href={"/messages"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Messages
              </Link>
              <Link
                href={"/account"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Account
              </Link>
              <Link
                href={"/help"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Help
              </Link>
            </div>
          </div>
        </>
      )}
      {(session && data?.role === 'Caregiver & Patient') && (
        <>
          <div className="fixed z-30 ml-0.5 w-64 shadow-sm">
            <div className="fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] text-lg dark:bg-gray-700 md:text-lg xl:text-xl">
              <Link
                href={"/caregiver"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Caregiver Dashboard
              </Link>
              <Link
                href={"/patient"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Patient Dashboard
              </Link>
              <Link
                href={"/messages"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Messages
              </Link>
              <Link
                href={"/account"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Account
              </Link>
              <Link
                href={"/help"}
                className=" border border-gray-200 py-1  px-4 dark:border-gray-800"
              >
                Help
              </Link>
            </div>
          </div>
        </>
      )}
      {!session && <>
      </>}
    </>
  );
};

export default SideNav;


