import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import NavLayout from "@/components/layout/navLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavLayout />
      <Layout>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white sm:text-[5rem]">
              House <span className="text-[hsl(280,100%,70%)]">Call</span>
            </h1>
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl text-black dark:text-white">
                Care in the comfort of your home
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 text-black hover:bg-black/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                href="/caregiver"
              >
                <h3 className="text-2xl font-bold">Caregivers →</h3>
                <div className="text-lg">
                  You are passionate to help those in need.
                </div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 text-black hover:bg-black/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
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
      </Layout>
    </>
  );
};

export default Home;
