// make functional component

import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import NavLayout from "@/components/layout/navLayout";

// eslint-disable-next-line @typescript-eslint/no-empty-interface

const Slug: NextPage = () => {
  
  const router = useRouter();
  const { slug } = router.query;
  if (typeof slug !== "string") return null;

  const { data: card } = trpc.sessionAPIs.getOneSession.useQuery({ slug });
  return (
    <>
    <Head>
    <title>Session: {card?.sessionId}</title>
  </Head>
  <NavLayout />
    <div className="flex h-screen items-center justify-center">
      <div className="mx-2 my-2 w-1/2 border-2">
        <div className="mb-4 mr-4 ml-4">
          <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-white">
            {card?.title}
          </div>
          <div className="text-sm">
            <p className="text-gray-900 dark:text-white">
              <span className="font-semibold text-gray-900 dark:text-white">
                Name:&nbsp;
              </span>
              {card?.name}
            </p>
            <p className="text-gray-900  dark:text-white">
              <span className="font-semibold text-gray-900 dark:text-white">
                Address:&nbsp;
              </span>
              {card?.address}
            </p>
            <p className="text-gray-900  dark:text-white">
              <span className="font-semibold text-gray-900 dark:text-white">
                Medical Notes:&nbsp;
              </span>
              {card?.medicalNotes}
            </p>
            <p className="text-gray-900  dark:text-white">
              <span className="font-semibold text-gray-900 dark:text-white">
                Overview:&nbsp;
              </span>
              {card?.overview}
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
    </div>
    </>
  );
};

export default Slug;
