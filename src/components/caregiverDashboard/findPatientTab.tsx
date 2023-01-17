import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const FindPatientTab = () => {
  const [rightCard, setRightCard] = useState(1);
  const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    id: "",
    name: "",
  });

  const selectedSession = trpc.sessionAPIs.getOneSessionTwo.useQuery({
    id: inputs?.id || (data?.[data?.length - 1]?.id ?? "0"),
  });

  return (
    <>
      <div className="grid grid-rows-1  rounded-b  bg-gray-100  px-4 dark:bg-gray-700">
        <div className="mb-4 grid grid-cols-1 rounded-xl bg-gray-100 pt-2 pb-2 dark:bg-gray-700 md:grid-cols-2">
          <div className="h-screen overflow-scroll md:h-128 lg:h-screen">
            <div className="grid justify-items-center gap-4 rounded bg-gray-100 pt-6 pb-6 dark:bg-gray-700">
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
                      const { id, title, name, address, overview } = data;
                      return (
                        <li
                          key={id}
                          className="mb-2 cursor-pointer items-center justify-around rounded-lg border border-gray-400  bg-gray-200 px-2 hover:bg-gray-100 dark:border-gray-400  dark:bg-gray-800 dark:hover:bg-gray-600"
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
                            <div className="mb-2 p-4 text-center text-xl text-gray-800 dark:text-gray-300">
                              {title}
                            </div>
                            <p className="text-sm  text-gray-800 dark:text-gray-300">
                              <span className="font-semibold text-gray-800 dark:text-gray-300">
                                Name:&nbsp;
                              </span>
                              {name}
                            </p>
                            <p className="text-sm  text-gray-800 dark:text-gray-300">
                              <span className="font-semibold  text-gray-800 dark:text-gray-300">
                                Address:&nbsp;
                              </span>
                              {address}
                            </p>
                            <p className="text-sm  text-gray-800 dark:text-gray-300">
                              <span className="font-semibold  text-gray-800 dark:text-gray-300">
                                Overview:&nbsp;
                              </span>
                              {overview}
                            </p>
                          </div>
                          <div className="mb-4 flex flex-col items-center justify-center">
                            <button
                              onClick={() =>
                                router.push(`/session/${data.slug}`)
                              }
                              className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white  md:hidden lg:hidden"
                            >
                              Schedule Session
                            </button>
                          </div>
                        </li>
                      );
                    })
                    .reverse()}
                </ul>
              </div>
            </div>
          </div>
          {/* Job Details Card */}
          <div className="hidden h-full overflow-scroll pr-2 md:block md:h-full lg:block">
            <div className="grid h-full justify-items-center gap-4 rounded bg-gray-100 pt-6 pb-6 dark:bg-gray-700">
              <div className="flex  h-128 w-11/12  flex-col  justify-between rounded-xl border border-gray-400 bg-gray-200 p-2 leading-normal dark:bg-gray-800">
                <div className={rightCard === 1 ? "" : "hidden"}>
                  <div className="mb-4 mr-4 ml-4  justify-center  ">
                    <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-white">
                      {selectedSession?.data?.title || isLoading}
                    </div>
                    <div className="text-sm ">
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Name:&nbsp;
                        </span>
                        {selectedSession?.data?.name || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Address:&nbsp;
                        </span>
                        {selectedSession?.data?.address || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Medical Notes:&nbsp;
                        </span>
                        {selectedSession?.data?.medicalNotes || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Overview:&nbsp;
                        </span>
                        {selectedSession?.data?.overview || isLoading}
                      </p>
                      <div className="flex flex-col items-center justify-center">
                        <button
                          onClick={() =>
                            router.push(
                              `/session/${selectedSession.data?.slug}`
                            )
                          }
                          className="mt-24 h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:border-white dark:text-white"
                        >
                          Schedule
                        </button>
                      </div>
                    </div>
                  </div>
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
