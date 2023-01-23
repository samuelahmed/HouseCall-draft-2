import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const HistoryPatient = () => {
  const [rightCard, setRightCard] = useState(1);
  const { data, isLoading } = trpc.sessionAPIs.getAllSessionsByUser.useQuery();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    sessionId: "",
    name: "",
  });

  return (
    <>
      <div className="grid grid-rows-1  bg-[hsl(0,0%,88%)] px-4 dark:bg-gray-700">
        <div className="mb-4 grid grid-cols-1 bg-[hsl(0,0%,88%)] pt-2 pb-2 dark:bg-gray-700">
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
                      const { sessionId, title, name, address, overview, author } = data;
                      console.log(author)
                      return (
                        <li
                          key={sessionId}
                          className="mb-2 cursor-pointer items-center justify-around rounded-lg border border-gray-400  bg-white px-2 hover:bg-gray-100 dark:border-gray-400  dark:bg-gray-800 dark:hover:bg-gray-600"
                        >
                          <div
                            onClick={() => {
                              setInputs({
                                sessionId: sessionId,
                                title: title || "still loading",
                                name: name || "still loading",
                              });
                            }}
                            className="mb-8"
                          >
                            <div className="mb-2 p-4 text-center text-xl text-gray-800 dark:text-gray-100">
                              {title}
                            </div>
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
       
        </div>
      </div>
    </>
  );
};

export default HistoryPatient;
