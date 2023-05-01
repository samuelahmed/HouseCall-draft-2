import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/layout/header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Care in the comfort of your home" />
      </Head>
      <Header />
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <div className="grid min-h-full grid-cols-2 bg-yellow9">
            <div className="relative col-span-1 bg-blue1">
              <Image src="/housecalloption2.jpeg" alt="background image" fill />
            </div>
            <div className="relative col-span-1 bg-blue1">
              <Image src="/housecalloption1.jpeg" alt="background image" fill />
            </div>
            <div className="relative col-span-1 bg-blue1">
              <Image src="/housecalloption4.jpeg" alt="background image" fill />
            </div>
            <div className="relative col-span-1 bg-blue1">
              <Image src="/housecalloption5.jpeg" alt="background image" fill />
            </div>
          </div>
        </div>
        <div className="relative z-10 flex h-screen flex-col items-center justify-center">
          <div className=" flex flex-col items-center justify-center bg-white px-4  py-4 border">
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
              ></Image>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl">Care in the comfort of your home</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
