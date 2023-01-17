import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import NavLayout from "@/components/layout/navLayout";

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
      <div className="flex h-screen items-center justify-center dark:bg-gray-800">
        <div className="mx-2 my-2 h-4/6 w-1/2 rounded-lg border-2 dark:bg-sky-900">
          <div className="mb-4 mr-4 ml-4">
            <div className="mb-2 mt-12 p-4 text-center  text-xl text-gray-800 dark:text-white">
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
          <div className="mt-12 mb-12 flex justify-around ">
            <button className="h-12 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white">
              Schedule Session
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slug;
