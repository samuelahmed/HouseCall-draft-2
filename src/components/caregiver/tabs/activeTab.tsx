import ScheduledSessionModal from "../modals/scheduledSessionModal";
import ActiveSession from "../sessions/active";

const ActiveTab = () => {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push(
      <div key={i} className="flex w-11/12 cursor-pointer flex-col  justify-between  rounded-xl border border-gray-400 bg-white p-2 leading-normal hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600">
        <ActiveSession />
        <div className="flex justify-center">
          <ScheduledSessionModal />
        </div>
      </div>
    );
  }

  return (
    <>
        <div className="grid grid-rows-1 bg-[hsl(0,0%,88%)]  dark:bg-gray-700 ">
          <div className="mb-4 grid grid-cols-1 pt-2 pb-2 md:grid-cols-1">
            <div className="max-h-78vh min-h-78vh overflow-scroll">
              <div className="grid justify-items-center gap-4 rounded bg-[hsl(0,0%,88%)] pt-6 pb-6 dark:bg-gray-700">
                {rows}
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default ActiveTab;
