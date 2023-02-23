import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import RegisterForm from "@/components/forms/registerForm";
import { useSession } from "next-auth/react";
import NavMenu from "@/components/layout/navMenu";

const Register: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <NavLayout />
      <div>
        {session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1">
                  {/* display nothing here since user is already registered */}
                  {/* maybe add a create second account link in future */}
                  {/* this would be the way for people to have both patient and caregiver accounts */}
                </div>
              </div>
            </main>
          </>
        )}
        {!session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1">
                  <RegisterForm />
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
