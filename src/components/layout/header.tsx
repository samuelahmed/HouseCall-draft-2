import { signIn, signOut, useSession } from "next-auth/react";
import ThemeManager from "./themeManager";
import Link from "next/link";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { trpc } from "@/utils/trpc";

const Header = ({
  showNav,
  setShowNav,
}: {
  showNav: boolean;
  setShowNav: any;
}) => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();

  return (
    <div className="sticky top-0 z-50 grid grid-cols-2 items-center bg-blue12 py-1">
      <div className="flex justify-start ">
        <div className="md:hidden md:pl-0">
          <Bars3CenterLeftIcon
            className="h-8 w-8 cursor-pointer text-olive2"
            onClick={() => setShowNav(!showNav)}
          />
        </div>
        <div className="ml-4 flex items-center pr-4 text-olive2">
          <div className="hidden text-xl text-olive2 md:block">House Call</div>
          <div className="md:hidden">
            {session &&
              (isLoading || (data && data?.username) || (
                <span className="text-red-600">Meow! No Name</span>
              ))}
          </div>
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
  return (
    <div className="flex max-h-5vh min-h-5vh items-center">
      <button
        className="dark:hover:bg-gray-600 mr-2 rounded-lg px-4 py-2 text-sm font-medium text-olive2 hover:bg-[hsl(0,0%,96%)] focus:outline-none dark:text-olive2 lg:py-2.5 marker:lg:px-5"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      <Link
        className={
          sessionData
            ? "hidden"
            : "dark:olive2 dark:hover:bg-gray-600 visible mr-6 rounded-lg px-4 py-2 text-sm font-medium text-olive2 hover:bg-[hsl(0,0%,96%)]"
        }
        href={"/register"}
      >
        Register
      </Link>
    </div>
  );
};
