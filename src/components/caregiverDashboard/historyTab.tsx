import HistoryOverviewCard from "./demoComponents/historyOverview";
import HistoryModal from "./historyModal";

const HistoryTab = () => {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push(
      <div className="flex w-11/12 cursor-pointer flex-col  justify-between  rounded-xl border border-gray-400 bg-white p-2 leading-normal hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600">
        <div className="items-baseline md:flex md:justify-around ">
          <HistoryOverviewCard />
          <div className="flex justify-center">
            <HistoryModal />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-rows-1 rounded-b bg-[hsl(0,0%,88%)] px-4 dark:bg-gray-700">
        <div className="grid grid-cols-1 pt-2 pb-2 md:grid-cols-1">
          <div className="h-full overflow-scroll pr-2 md:max-h-screen lg:max-h-screen ">
            <div className="grid justify-items-center gap-4 rounded bg-[hsl(0,0%,88%)] pt-6 pb-6 dark:bg-gray-700">
              {rows}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryTab;
