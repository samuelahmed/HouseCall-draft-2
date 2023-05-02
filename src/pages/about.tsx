import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";
import UnderConstruction from "@/components/layout/underConstruction";
import Image from "next/image";

const Help: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Help</title>
      </Head>
      {/* <NavLayout /> */}
      <Header />
      <div>
        {session && (
          <div>
            <UnderConstruction />
          </div>
        )}
        {!session && (
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
              , we fill the gaps that they cannot fulfill, helping patients with
              the many daily needs, small and big, to help achieve a better
              quality of life.
            </p>

            <p className="py-2">
              We strongly believe that patients know their needs and that many
              people are wonderful caregivers. We help connect you by allowing
              patients to create care sessions which describe their needs, and
              caregivers can apply to these sessions. It is best practice to
              chat with your potential patient or caregiver before accepting to
              make sure that you are a good fit for each other.
            </p>

            <p className="py-2">
              All session locations are decided by the patient, with their home
              being the default. Ultimately it is up to your creativity and the
              needs of the patient to decide how the session will be conducted.
            </p>
            <p className="py-2">
              To get started simply register your account, select a role, and
              begin creating or applying to sessions.
            </p>
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
        )}
      </div>
    </>
  );
};

export default Help;
