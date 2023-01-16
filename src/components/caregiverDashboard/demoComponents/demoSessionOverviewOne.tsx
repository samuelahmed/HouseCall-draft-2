import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";




const DemoSessionOverviewOne = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();
  const router = useRouter();

  return (
    <>
    
    {data
                  ?.map((data) => {
                    const { id, title, name, address, medicalNotes, overview } =
                      data;
                    return (
                      <li
                        key={id}
                        className="flex w-full items-center justify-between"
                      >

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
    </>
  );
};

export default DemoSessionOverviewOne;
