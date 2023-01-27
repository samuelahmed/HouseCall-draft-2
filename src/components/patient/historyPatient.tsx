import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";

const HistoryPatient = () => {
  const { data } = trpc.sessionAPIs.readAllSessionsByUser.useQuery();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    sessionId: "",
  });

  const selectedSession = trpc.sessionAPIs.readOneSessionBySessionId.useQuery({
    sessionId:
      inputs?.sessionId || (data?.[data?.length - 1]?.sessionId ?? "0"),
  });

  return (
    <>
      <div className="grid grid-rows-1  bg-[hsl(0,0%,88%)] px-4 dark:bg-gray-700">
        <div className="mb-4 grid grid-cols-1 bg-[hsl(0,0%,88%)] pt-2 pb-2 dark:bg-gray-700">
          <div className="max-h-78vh min-h-78vh overflow-scroll">
            <div className="grid grid-cols-1 justify-items-center gap-4  bg-[hsl(0,0%,88%)] pt-6 pb-6 dark:bg-gray-700">
              <ul>
                {data
                  ?.map((data) => {
                    const {
                      sessionId,
                      title,
                      overview,
                      medicalNotes,
                      totalCompensation,
                      totalHours,
                    } = data;
                    return (
                      <li
                        key={sessionId}
                        className="mb-2 cursor-pointer items-center justify-around rounded-lg border border-gray-400  bg-white px-2 hover:bg-gray-100 dark:border-gray-400  dark:bg-gray-800 dark:hover:bg-gray-600"
                      >
                        <div className="text-center text-xl text-gray-800 dark:text-gray-100">
                          {title}
                        </div>
                        <div className="grid grid-cols-3 items-center justify-center">
                          <div className="cols-span-1">
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold  text-gray-800 dark:text-gray-200">
                                Overview:&nbsp;
                              </span>
                              {overview}
                            </p>
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold  text-gray-800 dark:text-gray-200">
                                Medical Notes:&nbsp;
                              </span>
                              {medicalNotes}
                            </p>
                          </div>
                          <div className="cols-span-1">
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold  text-gray-800 dark:text-gray-200">
                                Hours:&nbsp;
                              </span>
                              {totalHours}
                            </p>
                            <p className="text-sm  text-gray-800 dark:text-gray-100">
                              <span className="font-semibold  text-gray-800 dark:text-gray-200">
                                Total:&nbsp;
                              </span>
                              ${totalCompensation}
                            </p>
                          </div>
                          <div className="cols-span-1 pb-2">
                            <button
                              onClick={() =>
                                router.push(
                                  `/session/${selectedSession.data?.slug}`
                                )
                              }
                              className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-800 hover:bg-[hsl(154,47%,66%)] dark:text-gray-100 dark:hover:text-gray-800"
                            >
                              Details
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
        </div>
      </div>
    </>
  );
};

export default HistoryPatient;
