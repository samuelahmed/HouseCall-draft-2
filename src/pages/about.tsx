import { type NextPage } from "next";
import Head from "next/head";
import Header from "@/components/layout/header";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const About: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta
          name="description"
          content="House Call connects patients and caregivers. Find the perfect caregiver or discover patients who need your help. Build lifelong relationships. Control your sessions. Meet in the comfort of home. Easily get started today!"
        />
        <title>About</title>
      </Head>
      <Header />
      <div>
        <div className="px-4 py-4 font-roboto">
          <h1 className="my-16 py-2 text-center font-robotoSlab text-4xl font-bold">
            Connecting <span className="text-blue11">patients </span>
            with <span className="text-blue11">caregivers</span>.
          </h1>
          <div className="grid min-h-screen grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2  ">
            <div className="cols-span-1 flex-center justify-top flex flex-col px-10 md:px-20 ">
              <h1 className="mt-8 py-2 text-center font-robotoSlab text-3xl font-bold">
                Find the perfect caregiver
              </h1>
              <p className=" py-2 ">
                Connect with compassionate caregivers who can assist you with
                your daily needs.
              </p>

              <h1 className="mt-8 py-2 text-center font-robotoSlab text-3xl font-bold">
                Discover patients who need your help.
              </h1>
              <p className="py-2">
                Satisfy your passion by helping patients and earn while doing so.
                
              </p>
              <h1 className="mt-8 py-2 text-center font-robotoSlab text-3xl font-bold">
                Build lifelong relationships
              </h1>
              <p className="py-2">
                Meet locals who need your services and caregivers to improve your quality of life.
              </p>
            </div>
            <div className="cols-span-1">
              <div className="grid grid-cols-1">
                <Image
                  src="/aboutSquare2.png"
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
                  src="/aboutSquare1.png"
                  alt="background image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
            <div className="cols-span-1 flex-center justify-top flex flex-col px-10 md:px-20">
              <h1 className="mt-8 py-2 text-center font-robotoSlab text-3xl font-bold">
                Control your sessions
              </h1>
              <p className="py-2">
                Patients have full control of their sessions and caregivers can
                discover and apply to sessions that fit their skills and
                schedule.
              </p>
              <h1 className="mt-8 py-2 text-center font-robotoSlab text-3xl font-bold">
                Meet in the comfort of home
              </h1>
              <p className="py-2">
                By default all sessions are in the comfort of the patients home.
                Ultimately up to the patient and caregiver to decide how to best
                hold their sessions.
              </p>
              <h1 className="mt-8 py-2 text-center font-robotoSlab text-3xl font-bold">
                Easily get started right now
              </h1>
              <p className="py-2">
                You can get started right now with three easy steps:
              </p>
              <ul>
                <li>1. Register your account</li>
                <li>2. Select your role</li>
                <li>3. Create or apply to sessions</li>
              </ul>
              <div className="my-4 flex items-center justify-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="cols-span-1 block md:hidden">
              <div className="col-span-1">
                <Image
                  src="/aboutSquare1.png"
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
    </>
  );
};

export default About;
