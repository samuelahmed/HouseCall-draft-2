import { signIn, signOut, useSession } from "next-auth/react";
import ThemeManager from "./themeManager";
import Link from "next/link";
import Image from "next/image";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";

const Header = ({
  showNav,
  setShowNav,
}: {
  showNav: boolean;
  setShowNav: any;
}) => {
  const { data: sessionData } = useSession();

  return (
    <div className="py-1 sticky top-0 z-50 grid grid-cols-2 items-center bg-gray-100 dark:bg-gray-700">
      <div className="flex justify-start ">
        <div className="pl-4 md:pl-0">
          <Bars3CenterLeftIcon
            className="ml-6 h-8 w-8 cursor-pointer text-gray-900 dark:text-gray-100"
            onClick={() => setShowNav(!showNav)}
          />
        </div>
        <Image
          className="pl-4"
          src={(sessionData && sessionData.user?.image) || ""}
          alt=""
        />
        <div className="ml-4 flex items-center pr-4 text-gray-900 dark:text-gray-100">
          {sessionData && <span>{sessionData.user?.name}</span>}
        </div>
      </div>
      <div className="flex justify-end">
        <ThemeManager />
        <AuthShowcase />
      </div>
    </div>
  );
};
export default Header;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  // console.log(sessionData)
  return (
    <div className="flex items-center">
      <button
        className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 hover:bg-white dark:hover:bg-gray-600 focus:outline-none dark:text-gray-100 marker:lg:px-5 lg:py-2.5"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>

      <Link
        className={
          sessionData
            ? "hidden"
            : "visible mr-6 text-sm text-gray-900 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-lg px-4 py-2"
        }
        href={"/register"}
      >
        Register
      </Link>
    </div>
  );
};
