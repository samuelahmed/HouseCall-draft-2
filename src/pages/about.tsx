import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "@/utils/trpc";

const About: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();

  return (
    <>
      <Head>
        <title>Help</title>
      </Head>
      <Header />
      <div>
        {session && (
          <div>
            <div className="px-4 py-4 font-roboto">
              <h1 className="py-2 text-center font-robotoSlab text-2xl font-bold">
                House Call is a platform that connects patients and caregivers
              </h1>
              <p className="py-2">
                Human care and connections are key to a healthy life. It is our
                mission to help all those in need access loving caregivers that
                can help improve their lives. We are not a medical platform,{" "}
                <span className="underline">
                  we do not provide vetted medical professionals
                </span>
                , we fill the gaps that they cannot fulfill, helping patients
                with the many daily needs, small and big, to help achieve a
                better quality of life.
              </p>

              <p className="py-2">
                We strongly believe that patients know their needs and that many
                people are wonderful caregivers. We help connect you by allowing
                patients to create care sessions which describe their needs, and
                caregivers can apply to these sessions. It is best practice to
                chat with your potential patient or caregiver before accepting
                to make sure that you are a good fit for each other.
              </p>

              <p className="py-2">
                All session locations are decided by the patient, with their
                home being the default. Ultimately it is up to your creativity
                and the needs of the patient to decide how the session will be
                conducted.
              </p>
              {session && data?.role === "Patient" && (
                <p className="py-2">
                  To get started simply{" "}
                  <Link
                    href={"/dashboard/patient/create"}
                    className="text-blue9"
                  >
                    create a session
                  </Link>
                  , and local caregivers will apply to meet your needs.
                </p>
              )}
              {session && data?.role === "Caregiver" && (
                <p className="py-2">
                  To get started simply{" "}
                  <Link
                    href={"/dashboard/caregiver/discover"}
                    className="text-blue9"
                  >
                    discover a session
                  </Link>
                  , and apply to meet patients that need your help.
                </p>
              )}
              <div className="grid grid-cols-2 py-2">
                <div className="col-span-1">
                  <div className="relative">
                    <div className="absolute inset-0">
                      <div className="grid grid-cols-1">
                        <Image
                          src="/patientoption4.jpeg"
                          alt="background image"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="relative">
                    <div className="absolute inset-0">
                      <div className="grid grid-cols-1">
                        <Image
                          src="/caregiveroption3.jpeg"
                          alt="background image"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!session && (
          <div className="px-4 py-4 font-roboto">
            <h1 className="my-16 py-2 text-center font-robotoSlab text-4xl font-bold">
              House <span className="text-blue11">Call </span> connects patients
              and caregivers
            </h1>
            <div className="grid min-h-screen grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2  ">
              <div className="cols-span-1 flex-center justify-top flex flex-col px-10 md:px-20 md:text-2xl">
                <h1 className="mt-8 py-2 text-center font-robotoSlab text-3xl font-bold">
                  Find the perfect caregiver
                </h1>
                <p className=" py-2 ">
                  Human care and connections are key to a healthy life. It is
                  our mission to help all those in need access loving caregivers
                  that can help improve their lives. We are not a medical
                  platform,{" "}
                  <span className="underline">
                    we do not provide vetted medical professionals
                  </span>
                  , we fill the gaps that they cannot fulfill, helping patients
                  with the many daily needs, small and big, to help achieve a
                  better quality of life.
                </p>
                <h1 className="mt-16 py-2 text-center font-robotoSlab text-3xl font-bold">
                  Discover patients who need your help
                </h1>
                <p className="py-2">
                  We strongly believe that patients know their needs and that
                  many people are wonderful caregivers. We help connect you by
                  allowing patients to create care sessions which describe their
                  needs, and caregivers can apply to these sessions. It is best
                  practice to chat with your potential patient or caregiver
                  before accepting to make sure that you are a good fit for each
                  other.
                </p>
              </div>
              <div className="cols-span-1">
                <div className="grid grid-cols-1">
                  <Image
                    src="/aboutPage2.png"
                    alt="background image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="cols-span-1 hidden md:block">
                <div className="col-span-1">
                  <Image
                    src="/aboutPage1.png"
                    alt="background image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="cols-span-1 flex-center justify-top flex flex-col px-10 md:px-20 md:text-xl">
                <h1 className="mt-8 py-2 text-center font-robotoSlab text-3xl font-bold">
                  Meet in the comfort of home
                </h1>
                <p className="py-2">
                  All session locations are decided by the patient, with their
                  home being the default. Ultimately it is up to your creativity
                  and the needs of the patient to decide how the session will be
                  conducted.
                </p>
                <h1 className="mt-16 py-2 text-center font-robotoSlab text-3xl font-bold">
                  Get started today
                </h1>
                <p className="py-2">
                  To get started simply{" "}
                  <Link href={"/register"} className="text-blue9">
                    register your account
                  </Link>
                  , and begin creating or applying to sessions.
                </p>
              </div>
              <div className="cols-span-1 block md:hidden">
                <div className="col-span-1">
                  <Image
                    src="/aboutPage1.png"
                    alt="background image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
