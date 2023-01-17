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

  const dataTwo = trpc.sessionAPIs.getOneSessionTwo.useQuery({
    id: inputs?.id || (data?.[data?.length - 1]?.id ?? "0"),
  });

  console.log(dataTwo?.data?.title);
  return (
    <>
      <div className="grid grid-rows-1  rounded-b  bg-gray-100  px-4 dark:bg-gray-900">
        <div className="grid grid-cols-1 bg-gray-200 pt-2 pb-2 md:grid-cols-2">
          <div className="h-screen overflow-scroll md:h-128 lg:h-screen">
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
                      const { id, title, name, address, overview } = data;
                      return (
                        <li
                          key={id}
                          className="mb-2 cursor-pointer items-center justify-around rounded-lg border border-gray-400 bg-white px-2 hover:bg-gray-100 dark:border-gray-400 dark:bg-sky-900"
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
                            <p className="text-sm text-gray-700 dark:text-white">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                Overview:&nbsp;
                              </span>
                              {overview}
                            </p>
                          </div>
                          <button
                            onClick={() => router.push(`/session/${data.slug}`)}
                            className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white  md:hidden lg:hidden"
                          >
                            Schedule Session
                          </button>
                          <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white md:hidden lg:hidden">
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
          {/* Job Details Card */}
          <div className="hidden h-full overflow-scroll pr-2 md:block md:h-full lg:block">
            <div className="grid h-full justify-items-center gap-4 rounded bg-gray-200 pt-6 pb-6 dark:bg-slate-900">
              <div className="flex  h-128 w-11/12  flex-col  justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal dark:bg-sky-900">
                <div className={rightCard === 1 ? "" : "hidden"}>
                  <div className="mb-4 mr-4 ml-4  justify-center  ">
                    <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-white">
                      {dataTwo?.data?.title || isLoading}
                    </div>
                    <div className="text-sm ">
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Name:&nbsp;
                        </span>
                        {dataTwo?.data?.name || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Address:&nbsp;
                        </span>
                        {dataTwo?.data?.address || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Medical Notes:&nbsp;
                        </span>
                        {dataTwo?.data?.medicalNotes || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Overview:&nbsp;
                        </span>
                        {dataTwo?.data?.overview || isLoading}
                      </p>
                      <div className="flex flex-col items-center justify-center">
                        <button
                          onClick={() =>
                            router.push(`/session/${dataTwo.data?.slug}`)
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
