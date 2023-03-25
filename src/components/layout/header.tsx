import { useSession } from "next-auth/react";
import ThemeManager from "./themeManager";
import { MenuIcon } from "@heroicons/react/outline";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import AuthShowcase from "./authShowcase";

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
    <div className="flex-cols-3 sticky top-0 z-50 flex items-center  justify-between bg-blue12 py-1 md:grid md:grid-cols-3">
      <div className="flex justify-start">
        <div className="md:hidden md:pl-0">
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
        {currentRoute}
      </div>
      <div className="flex justify-end ">
        <div className="hidden items-center text-darkOlive12 md:flex">
          {session &&
            (isLoading || (data && data?.username) || (
              <span className="text-red-600">Meow! No Name</span>
            ))}
        </div>
        <ThemeManager />
        <AuthShowcase />
      </div>
    </div>
  );
};
export default Header;
