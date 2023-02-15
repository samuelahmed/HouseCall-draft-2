import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import NavLayout from "@/components/layout/navLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Care in the comfort of your home" />
      </Head>
      <NavLayout />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 sm:text-[5rem]">
            House <span className="text-[hsl(280,100%,70%)]">Call</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl text-gray-800 dark:text-gray-100">
              Care in the comfort of your home
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 text-gray-800 hover:bg-black/20 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/20"
              href="/caregiver"
            >
              <h3 className="text-2xl font-bold">Caregivers →</h3>
              <div className="text-lg">
                You are passionate to help those in need.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 text-gray-800 hover:bg-black/20 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/20"
              href="/patient"
            >
              <h3 className="text-2xl font-bold">Patients →</h3>
              <div className="text-lg">
                You or someone you care about needs assistance.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
