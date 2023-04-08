import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// import NavLayout from "@/components/layout/navLayout";
import Image from "next/image";
import Header from "@/components/layout/header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Care in the comfort of your home" />
      </Head>
      {/* <NavLayout /> */}
      <Header />

      {/* TODO: make this standard page with user auth state */}
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
        </div>
      </main>
    </>
  );
};

export default Home;
