import { useState } from "react";

const HistoryModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
        onClick={() => setShowModal(true)}
      >
        Details
      </button>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 grid h-screen place-items-center backdrop-brightness-50">
            <div className="w-11/12 justify-items-center rounded border-2 border-gray-300 outline-none focus:outline-none ">
              <div className="relative mx-auto">
                <div className=" relative flex flex-col bg-white shadow-lg outline-none focus:outline-none dark:bg-sky-900">
                  <div className="h-128 rounded-t border-gray-300 ">
                    <div className="mx-4 mt-4 flex items-center justify-around text-sm">
                      <p className="px-2 text-gray-900 dark:text-white">
                        Milpitas
                      </p>
                      <p className="px-2 text-gray-900 dark:text-white">
                        Saturday January 3, 2023
                      </p>
                      <p className="px-2 text-gray-900 dark:text-white">
                        6:00am - 11:00am
                      </p>
                      <p className="px-2 text-gray-900 dark:text-white">
                        $35 / hour
                      </p>
                    </div>
                    <div className="mb-4 mr-4 ml-4">
                      <div className="mb-2 p-4 text-center text-xl text-gray-800 dark:text-white">
                        Mobility Support
                      </div>

                      <div className="text-sm">
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Pay per Hour:&nbsp;
                          </span>
                          $35
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Total Compensation:&nbsp;
                          </span>
                          $175
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Date:&nbsp;
                          </span>
                          Friday January 3, 2023
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Time:&nbsp;
                          </span>
                          6:00am - 11:00am
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Total Hours:&nbsp;
                          </span>
                          5
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Address:&nbsp;
                          </span>
                          343 Bay Drive, Milpitas
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Location Notes:&nbsp;
                          </span>
                          Gate code is 3820 you can call if you have any issues
                          getting inside.
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Age:&nbsp;
                          </span>
                          66
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Medical Notes:&nbsp;
                          </span>
                          Broke Wrist earlier this year
                        </p>
                      </div>
                      <p className="pt-4 text-base text-gray-800 dark:text-white">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Overview:&nbsp;
                        </span>
                        I need help walking around and taking walks to the park
                        to stay active
                      </p>
                      <div className="grid grid-flow-col grid-rows-1 gap-4 pt-4">
                        <div className="flex justify-start">
                          <button
                            onClick={() => setShowModal(false)}
                            className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                          >
                            Contact Patient
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white"
                          >
                            Report Session
                          </button>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setShowModal(false)}
                            className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default HistoryModal;
