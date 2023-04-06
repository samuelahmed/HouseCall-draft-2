import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../../../components/layout/navLayout";
import { useSession } from "next-auth/react";
// import NavMenu from "@/components/layout/navMenu";
import LoginForm from "@/components/forms/loginForm";
import CreateSession from "@/components/patient/createSession";
import { OverlayContainer } from "@react-aria/overlays";
// import DateEngine from "@/components/dateSelect/dateEngine";
import Header from "@/components/layout/header";

const Create: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Create</title>
      </Head>
      {/* <NavLayout /> */}
      < Header />




      <div>
        {session && (
          <>
            {/* TODO: fix the overlay container issue */}
            {/* this OverlayContainer is required for the calendar stuff
            It does have behaviors such as impacting the tab order of the page, etc. 
            Probably want to find a way to place the OverlayContainer closer to its actuall need
            However at the moment attempting to do so will push everything in the container all the way to the bottom of the page, regardless of styling.  */}
            <OverlayContainer>
              <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">




      

              </main>
            </OverlayContainer>
          </>
        )}
        {!session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              {/* <NavMenu /> */}
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1">
                  <LoginForm />
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default Create;
