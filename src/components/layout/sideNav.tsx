import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import {
  ChatBubbleIcon,
  FaceIcon,
  PersonIcon,
  CalendarIcon,
  IdCardIcon,
  ArchiveIcon,
  QuestionMarkIcon,
  EnterIcon,
  Pencil2Icon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

const SideNav = () => {
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();
  const { data: session } = useSession();
  return (
    <>
      {session && user?.role === "Caregiver" && (
        <>
          <div className="fixed col-span-1 min-h-95vh min-w-40vw max-w-sm bg-slate12 text-olive2 lg:block">
            <div className="flex flex-col items-baseline space-y-2 pl-8 pt-4 text-lg">
              <Link
                href={"/dashboard/caregiver/discover"}
                className="flex flex-row items-center"
              >
                <FaceIcon className="mr-2" />
                Discover
              </Link>
              <Link
                href={"/dashboard/caregiver/applied"}
                className="flex flex-row items-center"
              >
                <IdCardIcon className="mr-2" />
                Applied
              </Link>

              <Link
                href={"/dashboard/caregiver/scheduled"}
                className="flex flex-row items-center"
              >
                <CalendarIcon className="mr-2" />
                Scheduled
              </Link>

              <Link
                href={"/dashboard/caregiver/history"}
                className="flex flex-row items-center"
              >
                <ArchiveIcon className="mr-2" />
                History
              </Link>
              <Link
                href={"/dashboard/messages"}
                className="flex flex-row items-center"
              >
                <ChatBubbleIcon className="mr-2" />
                Messages
              </Link>
              <Link
                href={"/dashboard/account"}
                className="flex flex-row items-center"
              >
                <PersonIcon className="mr-2" />
                Account
              </Link>
              <Link href={"/help"} className="flex flex-row items-center">
                <QuestionMarkIcon className="mr-2" />
                Help
              </Link>
            </div>
          </div>
        </>
      )}
      {session && user?.role === "Patient" && (
        <>
          <div className="absolute z-50 col-span-1 bg-blue11 dark:bg-darkBlue2 text-olive2 lg:block">
            <div className="flex flex-col items-baseline divide-y border border-1 border-t-0 border-blue12 dark:border-darkBlue1">


                <Link
                  href={"/dashboard/patient/create"}
                  className="flex flex-row items-center w-full px-1 py-1"
                >
                  {/* <PlusCircledIcon className="mr-2" /> */}
                  <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 w-full">
                  Create
              </div>    
                  
                </Link>

                <Link
                  href={"/dashboard/patient/sessions"}
                  className="flex flex-row items-center w-full px-1 py-1"
                >
                  <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 w-full">
                  New
              </div>    
                </Link>

              <Link
                href={"/dashboard/messages"}
                className="flex flex-row items-center w-full px-1 py-1"
                >
                <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 w-full">
                Scheduled
              </div>    
              </Link>
              <Link
                href={"/dashboard/account"}
                className="flex flex-row items-center w-full px-1 py-1"
                >
                <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 w-full">
                Completed
              </div>    
              </Link>
              <Link href={"/help"} 
                  className="flex flex-row items-center w-full px-1 py-1"
                  >
                <div className="px-2 hover:outline hover:outline-2 hover:outline-blue4 w-full">
                Canceled
              </div>    
              </Link>
            </div>
          </div>
        </>
      )}
      {!session && (
        <>
          <div className="fixed col-span-1 min-h-full min-w-40vw max-w-sm bg-slate12 text-olive2 lg:block">
            <div className="flex flex-col items-baseline space-y-2 pl-8 pt-4 text-lg">
              <Link href={"/login"} className="flex flex-row items-center">
                <EnterIcon className="mr-2" />
                Login
              </Link>
              <Link href={"/register"} className="flex flex-row items-center">
                <Pencil2Icon className="mr-2" />
                Register
              </Link>
              <Link href={"/help"} className="flex flex-row items-center">
                <QuestionMarkIcon className="mr-2" />
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
