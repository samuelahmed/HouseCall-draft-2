import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex max-h-5vh min-h-5vh items-center">
      <div className="bg-blue12 py-1 px-1 dark:bg-darkBlue1">
        <button
          className="cursor-pointer bg-blue12 px-2 py-1 text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue1"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Logout" : "Login"}
        </button>
      </div>
      <div className="bg-blue12 py-1 px-1 dark:bg-darkBlue1">
        <Link
          className={
            sessionData
              ? "hidden"
              : "mr-2 cursor-pointer bg-blue12 px-2 py-1 text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue1"
          }
          href={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default AuthShowcase;
