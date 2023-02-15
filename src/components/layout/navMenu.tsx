import {
  ChatBubbleIcon,
  FaceIcon,
  PersonIcon,
  CalendarIcon,
  IdCardIcon,
  ArchiveIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const NavMenu = () => {
  const { data: user } = trpc.userAPIs.readCurrentUser.useQuery();
  const { data: session } = useSession();

  return (
    <>
      {session && user?.address && user?.role === "Caregiver" && (
        <>
          <div className="col-span-1 hidden min-h-max bg-slate12 text-darkOlive12 md:flex lg:block">
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
              <Link
                href={"/dashboard/help"}
                className="flex flex-row items-center"
              >
                <QuestionMarkIcon className="mr-2" />
                Help
              </Link>
            </div>
          </div>
        </>
      )}
      {session && user?.address && user?.role === "Patient" && (
        <>
          <div className="col-span-1 hidden min-h-max bg-slate12 text-darkOlive12 md:flex lg:block">
            <div className="flex flex-col items-baseline space-y-2 pl-8 pt-4 text-lg">
              <Link
                href={"/dashboard/patient/create"}
                className="flex flex-row items-center"
              >
                <FaceIcon className="mr-2" />
                Create
              </Link>
              <Link
                href={"/dashboard/patient/pending"}
                className="flex flex-row items-center"
              >
                <IdCardIcon className="mr-2" />
                Pending
              </Link>

              <Link
                href={"/dashboard/patient/scheduled"}
                className="flex flex-row items-center"
              >
                <CalendarIcon className="mr-2" />
                Scheduled
              </Link>

              <Link
                href={"/dashboard/patient/completed"}
                className="flex flex-row items-center"
              >
                <ArchiveIcon className="mr-2" />
                Completed
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
              <Link
                href={"/dashboard/help"}
                className="flex flex-row items-center"
              >
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

export default NavMenu;
