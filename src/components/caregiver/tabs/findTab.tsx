import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const FindTab = () => {
  const [rightCard, setRightCard] = useState(1);
  const { data, isLoading } = trpc.careSessionAPIs.readAllSessions.useQuery();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    id: "",
    name: "",
    address: "",
    overview: "",
    sessionType: "",
    hourlyRate: 0,
    totalHours: 0,
    totalCompensation: 0,
    careSessionStatus: "",
  });

  const selectedSession = trpc.careSessionAPIs.readOneSessionBySessionId.useQuery({
    id:
      inputs?.id || (data?.[data?.length - 1]?.id ?? "0"),
  });

  return (
    <>
      <div className="grid grid-rows-1  bg-[hsl(0,0%,88%)] px-4 dark:bg-gray-700">
        <div className="mb-4 grid grid-cols-1 bg-[hsl(0,0%,88%)] pt-2 pb-2 dark:bg-gray-700 md:grid-cols-2">
          <div className="max-h-78vh min-h-78vh overflow-scroll">
            <div className="grid justify-items-center gap-4  bg-[hsl(0,0%,88%)] pt-6 pb-6 dark:bg-gray-700">
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
                        overview,
                        sessionType,
                        hourlyRate,
                        totalHours,
                        totalCompensation,
                        careSessionStatus,
                      } = data;
                      return (
                        <li
                          key={id}
                          className="mb-2 cursor-pointer items-center justify-around rounded-lg border border-gray-400  bg-white px-2 hover:bg-gray-100 dark:border-gray-400  dark:bg-gray-800 dark:hover:bg-gray-600"
                        >
                          <div
                            onClick={() => {
                              setInputs({
                                id: id,
                                title: title || "still loading",
                                name: name || "still loading",
                                address: address || "still loading",
                                overview: overview || "still loading",
                                sessionType: sessionType || "still loading",
                                careSessionStatus: careSessionStatus || "still loading",
                                hourlyRate: Number(data.hourlyRate) || 0,
                                totalHours: Number(data.totalHours) || 0,
                                totalCompensation:
                                  Number(data.totalCompensation) ||
                                  (Number(totalHours) || 0) *
                                    (Number(hourlyRate) || 0),
                              });
                            }}
                            className="mb-8"
                          >
                            <div className="mb-2 p-4 text-center text-xl text-gray-800 dark:text-gray-100">
                              {title}
                            </div>
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold text-gray-800 dark:text-gray-200">
                                Status:&nbsp;
                              </span>
                              {careSessionStatus}
                            </p>
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold text-gray-800 dark:text-gray-200">
                                Name:&nbsp;
                              </span>
                              {name}
                            </p>
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold  text-gray-800 dark:text-gray-200">
                                Address:&nbsp;
                              </span>
                              {address}
                            </p>
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold  text-gray-800 dark:text-gray-200">
                                Overview:&nbsp;
                              </span>
                              {overview}
                            </p>
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold  text-gray-800 dark:text-gray-200">
                                Total Compensation:&nbsp;
                              </span>
                              ${totalCompensation}
                            </p>
                          </div>
                          <div className="mb-4 flex flex-col items-center justify-center">
                            <button
                              onClick={() =>
                                router.push(`/careSession/${data.slug}`)
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
          <div className="hidden overflow-scroll pr-2 md:block">
            <div className="grid max-h-78vh min-h-78vh justify-items-center gap-4 rounded bg-[hsl(0,0%,88%)] pt-6 pb-6 dark:bg-gray-700">
              <div className="flex h-128 w-11/12  flex-col  justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal dark:bg-gray-800">
                <div className={rightCard === 1 ? "" : "hidden"}>
                  <div className="mb-4 mr-4 ml-4  justify-center  ">
                    <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-gray-100">
                      {selectedSession?.data?.title || isLoading}
                    </div>
                    <div className="text-sm ">
                    <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Status:&nbsp;
                        </span>
                        {selectedSession?.data?.careSessionStatus || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Name:&nbsp;
                        </span>
                        {selectedSession?.data?.name || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Address:&nbsp;
                        </span>
                        {selectedSession?.data?.address || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Medical Notes:&nbsp;
                        </span>
                        {selectedSession?.data?.medicalNotes || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Overview:&nbsp;
                        </span>
                        {selectedSession?.data?.overview || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Hourly Rate:&nbsp;
                        </span>
                        ${selectedSession?.data?.hourlyRate || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Hours:&nbsp;
                        </span>
                        {selectedSession?.data?.totalHours || isLoading}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Total:&nbsp;
                        </span>
                        ${selectedSession?.data?.totalCompensation || isLoading}
                      </p>
                      <div className="flex flex-col items-center justify-center">
                        <button
                          onClick={() =>
                            router.push(
                              `/careSession/${selectedSession.data?.slug}`
                            )
                          }
                          className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) mt-6 h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-800 hover:bg-[hsl(154,47%,66%)] dark:text-gray-100 dark:hover:text-gray-800"
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

export default FindTab;
