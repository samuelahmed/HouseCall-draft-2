import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import LoginForm from "@/components/forms/loginForm";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      {session && (
        <>
          <div className="flex min-h-70vh items-center justify-center text-5xl">
            <div className="px-2 text-olive12 dark:text-darkOlive12">Hello</div>
            <span className="text-blue10">
              {isLoading || (
                  <span className="">{data && data?.username}</span>
                ) || <span className="text-red11 ">Error! No Name</span>}
            </span>
          </div>

          {!data?.address && (
            <div className="flex flex-col items-center">
              <span className="text-red11">Your account needs an address</span>
              <Button
                variant="default"
                size="default"
                onClick={() => router.push("/dashboard/account")}
              >
                Update Address
              </Button>
            </div>
          )}
          {!data?.role && (
            <div className="mt-6 flex flex-col items-center">
              <span className="text-red11">Your account needs a role</span>
              <Button
                variant="default"
                size="default"
                onClick={() => router.push("/dashboard/account")}
              >
                Update Role
              </Button>
            </div>
          )}
        </>
      )}
      {!session && (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="py-10 text-center font-robotoSlab text-3xl font-bold">
            Login to your Account
          </h1>
          <LoginForm />
        </div>
      )}
    </>
  );
};

export default Dashboard;
