import { useState } from "react";
import DemoSessionDetailsOne from "./demoComponents/demoSessionDetailsOne";
import DemoSessionDetailsTwo from "./demoComponents/demoSessionDetailsTwo";
import DemoSessionDetailsThree from "./demoComponents/demoSessionDetailsThree";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import DemoSessionOverviewOne from "./demoComponents/demoSessionOverviewOne";

const FindPatientTab = () => {
  const [rightCard, setRightCard] = useState(1);
  const { data: session } = useSession();
  const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();
  const router = useRouter();

  return (
    <>
      {/* MAIN SECTION */}
      <div className="grid grid-rows-1  rounded-b  bg-gray-100  px-4 dark:bg-gray-900">
        <div className="grid grid-cols-1 pt-2 pb-2 md:grid-cols-2">
          {/* POTENTIAL SESSION CARDS */}
          <div className="h-full overflow-scroll pr-2 md:max-h-screen lg:max-h-screen ">
            <div className="grid justify-items-center gap-4 rounded bg-gray-200 pt-6 pb-6 dark:bg-slate-900">
              <ul className="mt-4">
                {data
                  ?.map((data) => {
                    const { id, title, name, address, medicalNotes, overview } =
                      data;
                    return (
                      <li
                        key={id}
                        className="flex w-full items-center justify-between"
                      >

                        < DemoSessionOverviewOne />
                        <div className="mx-6 my-2 w-1/2 border-2 border-gray-900">
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
                            <button
                              onClick={() =>
                                router.push(`/session/${data.slug}`)
                              }
                              className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                            >
                              Learn More
                            </button>
                            <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white">
                              Report Post
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })
                  .reverse()}
              </ul>
            </div>
          </div>
          {/* Job Details Cards */}
          <div className="hidden h-full overflow-scroll pr-2 md:block md:h-full lg:block">
            <div className="grid h-full justify-items-center gap-4 rounded bg-gray-200 pt-6 pb-6 dark:bg-slate-900">
              <div className="flex  h-128 w-11/12  flex-col  justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal dark:bg-sky-900">
                <div className={rightCard === 1 ? "" : "hidden"}>
                  <DemoSessionDetailsOne />
                </div>
                <div className={rightCard === 2 ? "" : "hidden"}>
                  <DemoSessionDetailsTwo />
                </div>
                <div className={rightCard === 3 ? "" : "hidden"}>
                  <DemoSessionDetailsThree />
                </div>
                <div className={rightCard === 4 ? "" : "hidden"}>
                  <DemoSessionDetailsTwo />
                </div>
                <div className={rightCard === 5 ? "" : "hidden"}>
                  <DemoSessionDetailsOne />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPatientTab;
