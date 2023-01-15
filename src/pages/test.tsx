import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState } from "react";
import { CareSession } from "@prisma/client";
import ItemModal from "@/components/itemModal";

//   ***********************************************************
//   * This component is only for test purposes.               *
//   * Route should be deleted or protected before production. *
//   ***********************************************************

const Test: NextPage = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState<CareSession[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <NavLayout />
      <Layout>
        {modalOpen && (
          <ItemModal setModalOpen={setModalOpen} setItems={setItems} />
        )}

        <div>
          {session && (
            <div className="grid min-h-screen justify-items-center dark:bg-gray-800">
              <div className="w-11/12 grid-rows-1 rounded bg-gray-100 dark:bg-gray-900">
                <main className="mx-auto my-12 max-w-3xl">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold">
                      Available Sessions
                    </h2>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="rounded-md bg-violet-500 p-2 text-sm text-white transition hover:bg-violet-600"
                    >
                      Create Session
                    </button>
                  </div>
                  <ul className="mt-4">
                    {data?.map((data) => {
                      const {
                        id,
                        title,
                        name,
                        address,
                        medicalNotes,
                        overview,
                      } = data;
                      return (
                        <li
                          key={id}
                          className="flex w-full items-center justify-between"
                        >
                          <div className="mx-2 my-2 w-1/2 border-2">
                            <div className="mb-4 mr-4 ml-4">
                              <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-white">
                                {title}
                              </div>
                              <div className="text-sm">
                                <p className="text-gray-900 dark:text-white">
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    Name:&nbsp;
                                  </span>
                                  {name}
                                </p>
                                <p className="text-gray-900  dark:text-white">
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    Address:&nbsp;
                                  </span>
                                  {address}
                                </p>
                                <p className="text-gray-900  dark:text-white">
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    Medical Notes:&nbsp;
                                  </span>
                                  {medicalNotes}
                                </p>
                                <p className="text-gray-900  dark:text-white">
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    Overview:&nbsp;
                                  </span>
                                  {overview}
                                </p>
                              </div>
                            </div>
                            <div className="mb-4 mt-4 flex justify-around">
                              <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white">
                                Schedule Session
                              </button>
                              <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white">
                                Report Post
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </main>
              </div>
            </div>
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
      </Layout>
    </>
  );
};

export default Test;
