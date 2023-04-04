import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../../../components/layout/navLayout";
import { useSession } from "next-auth/react";
// import NavMenu from "@/components/layout/navMenu";
import LoginForm from "@/components/forms/loginForm";
import CreateSession from "@/components/patient/createCareSession";
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
      <Header />
      <div>
        {session && (
          <>
            {/* still breaks without overlay container... */}
            <OverlayContainer>
              <CreateSession />
            </OverlayContainer>
          </>
        )}
        {!session && (
          <>
            {/* <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className=" grid min-h-95vh grid-cols-1 place-items-center bg-blue1 dark:bg-darkBlue1"> */}
                  <LoginForm />
                {/* </div>
              </div>
            </main> */}
          </>
        )}
      </div>
    </>
  );
};

export default Create;
