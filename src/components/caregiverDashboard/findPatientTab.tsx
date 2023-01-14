import { useState } from "react";
import MobileFindSessionModal from "./mobileFindSessionModal";
import DemoSessionOverviewOne from "./demoComponents/demoSessionOverviewOne";
import DemoSessionOverviewTwo from "./demoComponents/demoSessionOverviewTwo";
import DemoSessionOverviewThree from "./demoComponents/demoSessionOverviewThree";
import DemoSessionDetailsOne from "./demoComponents/demoSessionDetailsOne";
import DemoSessionDetailsTwo from "./demoComponents/demoSessionDetailsTwo";
import DemoSessionDetailsThree from "./demoComponents/demoSessionDetailsThree";

const FindPatientTab = () => {
  const [rightCard, setRightCard] = useState(1);
  return (
    <>
      {/* MAIN SECTION */}
      <div className="grid grid-rows-1  rounded-b  bg-gray-100  px-4 dark:bg-gray-900">
        <div className="grid grid-cols-1 pt-2 pb-2 md:grid-cols-2">
          {/* POTENTIAL SESSION CARDS */}
          <div className="h-full overflow-scroll pr-2 md:max-h-screen lg:max-h-screen ">
            <div className="grid justify-items-center gap-4 rounded bg-gray-200 pt-6 pb-6 dark:bg-slate-900">
              <div
                className="flex w-11/12 cursor-pointer flex-col justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal hover:bg-gray-100 dark:bg-sky-900 dark:hover:bg-sky-800"
                onClick={(e) => {
                  e.preventDefault();
                  setRightCard(1);
                }}
              >
                <DemoSessionOverviewOne />
                <div className="flex justify-center md:hidden lg:hidden">
                  <MobileFindSessionModal />
                </div>
              </div>
              <div
                className="flex w-11/12 cursor-pointer flex-col justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal hover:bg-gray-100 dark:bg-sky-900 dark:hover:bg-sky-800"
                onClick={(e) => {
                  e.preventDefault();
                  setRightCard(2);
                }}
              >
                <DemoSessionOverviewTwo />
                <div className="mb-4 mt-4 flex justify-around md:hidden lg:hidden">
                  <MobileFindSessionModal />
                </div>
              </div>
              <div
                className="flex w-11/12 cursor-pointer flex-col justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal hover:bg-gray-100 dark:bg-sky-900 dark:hover:bg-sky-800"
                onClick={(e) => {
                  e.preventDefault();
                  setRightCard(3);
                }}
              >
                <DemoSessionOverviewThree />
                <div className="mb-4 mt-4 flex justify-around md:hidden lg:hidden">
                  <MobileFindSessionModal />
                </div>
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setRightCard(4);
                }}
                className="flex w-11/12 cursor-pointer flex-col justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal hover:bg-gray-100 dark:bg-sky-900 dark:hover:bg-sky-800"
              >
                <DemoSessionOverviewOne />
                <div className="mb-4 mt-4 flex justify-around  md:hidden lg:hidden">
                  <MobileFindSessionModal />
                </div>
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setRightCard(5);
                }}
                className="flex w-11/12 cursor-pointer flex-col justify-between rounded-xl border border-gray-400 bg-white p-2 leading-normal dark:bg-sky-900 dark:hover:bg-sky-800 md:hover:bg-gray-100"
              >
                <DemoSessionOverviewOne />
                <div className="mb-4 mt-4 flex justify-around  md:hidden lg:hidden">
                  <MobileFindSessionModal />
                </div>
              </div>
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
