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
    <div className="sticky top-0 z-50 items-center bg-pink-200 grid grid-cols-2">
        <div className="flex justify-start ">
          <div className="pl-4 md:pl-0">
            <Bars3CenterLeftIcon
              className="h-8 w-8 cursor-pointer ml-6 text-gray-700 dark:text-white"
              onClick={() => setShowNav(!showNav)}
            />
          </div>
          <Image
            className="pl-4"
            src={(sessionData && sessionData.user?.image) || ""}
            alt=""
          />
          <div className="ml-4 flex items-center pr-4 text-gray-800 dark:text-white">
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
        className=" mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>

      <Link className={sessionData ? "hidden" : "visible mr-6"} href={"/register"}>
        Register
      </Link>
    </div>
  );
};
