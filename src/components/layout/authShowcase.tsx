import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex max-h-5vh min-h-5vh items-center">
      <button
        className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-darkOlive12 hover:bg-blue10 focus:outline-none lg:py-2.5 marker:lg:px-5"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Logout" : "Login"}
      </button>
      <Link
        className={
          sessionData
            ? "hidden"
            : "visible mr-6 rounded-lg px-4 py-2 text-sm font-medium text-darkOlive12 hover:bg-blue10"
        }
        href={"/register"}
      >
        Register
      </Link>
    </div>
  );
};

export default AuthShowcase;
