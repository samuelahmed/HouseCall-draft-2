import HistorySession from "../sessions/history";

const HistoryTab = () => {
  return (
    <>
      <div className="grid grid-rows-1  bg-[hsl(0,0%,88%)] px-4 dark:bg-gray-700 ">
        <div className="mb-4 grid grid-cols-1 pt-2 pb-2 md:grid-cols-1 ">
          <div className="max-h-78vh min-h-78vh overflow-scroll">
            <div className="grid max-h-78vh min-h-78vh gap-4 rounded bg-[hsl(0,0%,88%)] pt-6 pb-6 dark:bg-gray-700 ">
              <HistorySession />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryTab;
