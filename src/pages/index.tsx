import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import NavLayout from "@/components/layout/navLayout";
import Image from "next/image";
import DateEngine from "@/components/dateSelect/dateEngine";
import { OverlayContainer } from "@react-aria/overlays";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Care in the comfort of your home" />
      </Head>
      <NavLayout />
      <main className="flex min-h-screen flex-col items-center justify-center bg-blue1 text-olive12 dark:bg-darkBlue1 dark:text-darkBlue12">


        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-row">
            <h1 className=" text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              House <span className="text-blue9">Call</span>
            </h1>
            <Image
              className="ml-6 self-center"
              src="/faviconLarge.png"
              alt="me"
              width="64"
              height="64"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl">Care in the comfort of your home</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 border border-blue6 bg-blue3 p-4 hover:bg-blue4 dark:border-darkBlue6 dark:bg-darkBlue3 dark:hover:bg-darkBlue4"
              href="/dashboard/caregiver/discover"
            >
              <h3 className="text-center text-2xl font-bold">Caregivers</h3>
              <div className="text-lg">
                You are passionate to help those in need.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 border border-blue6 bg-blue3 p-4 hover:bg-blue4 dark:border-darkBlue6 dark:bg-darkBlue3 dark:hover:bg-darkBlue4"
              href="/dashboard/patient/create"
            >
              <h3 className="text-center text-2xl font-bold">Patients</h3>
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
