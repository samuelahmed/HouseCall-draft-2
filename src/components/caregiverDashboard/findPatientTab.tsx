import { useState } from "react";

import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const FindPatientTab = () => {
  const [rightCard, setRightCard] = useState(1);
  const { data: session } = useSession();
  const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    id: "",
    name: "",
  });

  const dataTwo = trpc.sessionAPIs.getOneSessionTwo.useQuery({
    id: inputs?.id || (data?.[data?.length - 1]?.id ?? "default_value"),
  });

  console.log(dataTwo?.data?.title);
  return (
    <>
      {/* MAIN SECTION */}
      <div className="grid grid-rows-1  rounded-b  bg-gray-100  px-4 dark:bg-gray-900">
        <div className="grid grid-cols-1 pt-2 pb-2 md:grid-cols-2">
          {/* POTENTIAL SESSION CARDS */}
          <div className="h-full overflow-scroll pr-2 md:max-h-screen lg:max-h-screen ">
            <div className="grid justify-items-center gap-4 rounded bg-gray-200 pt-6 pb-6 dark:bg-slate-900">
              <div
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  setRightCard(1);
                }}
              >
                <ul>
                  {data
                    ?.map((data) => {
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
                          className="mb-2 cursor-pointer items-center justify-around rounded border-2 border-gray-300 bg-white px-2 hover:bg-gray-100 dark:border-gray-400 dark:bg-sky-900"
                        >
                          <div
                            onClick={() => {
                              setInputs({
                                id: id,
                                title: title || "still loading",
                                name: name || "still loading",
                              });
                            }}
                            className="mb-8"
                          >
                            <div className="mb-2 p-4 text-center text-xl text-gray-800 dark:text-white">
                              {title}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-white">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                Overview:&nbsp;
                              </span>
                              {overview}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-white">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                Medical Notes:&nbsp;
                              </span>
                              {medicalNotes}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-white">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                Name:&nbsp;
                              </span>
                              {name}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-white">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                Address:&nbsp;
                              </span>
                              {address}
                            </p>
                          </div>

                          <button
                            onClick={() => router.push(`/session/${data.slug}`)}
                            className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                          >
                            Learn More
                          </button>
                          <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white">
                            Report Post
                          </button>
                        </li>
                      );
                    })
                    .reverse()}
                </ul>
              </div>
            </div>
          </div>
          {/* Job Details Cards */}
          <div className="hidden h-full overflow-scroll pr-2 md:block md:h-full lg:block">
            <div className="grid h-full justify-items-center gap-4 rounded bg-gray-200 pt-6 pb-6 dark:bg-slate-900">
              <div className="flex  h-128 w-11/12  flex-col  justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal dark:bg-sky-900">
                <div className={rightCard === 1 ? "" : "hidden"}>
                  <div className="mt-4 flex items-center justify-around text-sm">
                    <p className="text-gray-900 dark:text-white">
                      {dataTwo.data?.name}
                      {dataTwo?.data?.name || "still not working"}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      Saturday January 4, 2023
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      9:00am - 5:00pm
                    </p>
                    <p className="text-gray-900 dark:text-white">$20 / hour</p>
                  </div>
                  <div className="mb-4 mr-4 ml-4">
                    <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-white">
                      {dataTwo?.data?.title || "still not working"}
                    </div>

                    {/* <div className="text-sm">
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Pay per Hour:&nbsp;
                        </span>
                        $20
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Total Compensation:&nbsp;
                        </span>
                        $160
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Date:&nbsp;
                        </span>
                        Friday January 4, 2023
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Time:&nbsp;
                        </span>
                        9:00am - 5:00pm
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Total Hours:&nbsp;
                        </span>
                        8
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Address:&nbsp;
                        </span>
                        113 Bloom Street, Mountain View
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Age:&nbsp;
                        </span>
                        72
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Medical Notes:&nbsp;
                        </span>
                        Diabetic
                      </p>
                    </div>
                    <p className="pt-4 text-base text-gray-800 dark:text-white">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Overview:&nbsp;
                      </span>
                      Need support throughout the day with general activities
                    </p>
                  </div>
                  <div className="mb-4 mt-4 flex justify-around">
                    <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:border-white dark:text-white">
                      Schedule Session
                    </button>
                    <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:border-white dark:text-white">
                      Report Post
                    </button> */}
                  </div>
                </div>
                {/* <div className={rightCard === 2 ? "" : "hidden"}>
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPatientTab;
