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

const NavMenu = () => {
  return (
    <div className="min-h-max col-span-1 hidden md:flex lg:block bg-slate12 text-darkOlive12">

      <div className="flex flex-col items-baseline space-y-2 pl-8 pt-4 text-lg">
        <Link
          href={"/dashboard/caregiver/discover"}
          className="flex flex-row items-center"
        >
          <FaceIcon className="mr-2" />
          Discover
        </Link>
        <Link href={"/dashboard/caregiver/applied"} className="flex flex-row items-center">
          <IdCardIcon className="mr-2" />
          Applied
        </Link>

        <Link href={"/dashboard/caregiver/scheduled"} className="flex flex-row items-center">
          <CalendarIcon className="mr-2" />
          Scheduled
        </Link>

        <Link href={"/dashboard/caregiver/history"} className="flex flex-row items-center">
          <ArchiveIcon className="mr-2" />
          History
        </Link>

        <Link href={"/dashboard/messages"} className="flex flex-row items-center">
          <ChatBubbleIcon className="mr-2" />
          Messages
        </Link>
        <Link href={"/dashboard/account"} className="flex flex-row items-center">
          <PersonIcon className="mr-2" />
          Account
        </Link>
        <Link href={"/dashboard/help"} className="flex flex-row items-center">
          <QuestionMarkIcon className="mr-2" />
          Help
        </Link>
      </div>
      </div>

  );
};

export default NavMenu;
