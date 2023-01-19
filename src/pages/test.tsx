import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import ResponsiveLayout from "@/components/layout/responsiveLayout";
import Link from "next/link";
import { useState } from "react";
import { CareSession } from "@prisma/client";
import { useRouter } from "next/router";

//   ***********************************************************
//   * This component is only for test purposes.               *
//   * Route should be deleted or protected before production. *
//   ***********************************************************

const Test: NextPage = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState<CareSession[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <NavLayout />
      <ResponsiveLayout>
        {/* {modalOpen && (
          <ItemModal setModalOpen={setModalOpen} setItems={setItems} />
        )} */}
        <div>
          {session && (
            <>
              <main className="grid min-h-screen grid-rows-6 justify-items-center dark:bg-slate-800">
                <div className="row-span-5 w-full rounded border-2 border-gray-200">
                  <div className="mx-1 my-1 h-full rounded border-2 border-gray-900">
                    
                  </div>
                </div>
                <div className=""></div>
              </main>
            </>
          )}
          {!session && (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
              <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                  Test <span className="text-[hsl(280,100%,70%)]">Page</span>
                </h1>
                <div className="flex flex-row gap-2">
                  <Link href={"/login"} className="rounded border py-1 px-4">
                    Login
                  </Link>
                  <Link href={"/register"} className="rounded border py-1 px-4">
                    Register
                  </Link>
                </div>
              </div>
            </main>
          )}
        </div>
      </ResponsiveLayout>
    </>
  );
};

export default Test;
