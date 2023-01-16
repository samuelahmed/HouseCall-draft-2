


const DemoSessionDetailsOne = () => {
  return (
    <>
      <div className="mt-4 flex items-center justify-around text-sm">
        <p className="text-gray-900 dark:text-white">San Jose</p>
        <p className="text-gray-900 dark:text-white">
          Saturday January 7, 2023
        </p>
        <p className="text-gray-900 dark:text-white">11:00am - 5:00pm</p>
        <p className="text-gray-900 dark:text-white">$25 / hour</p>
      </div>
      <div className="mb-4 mr-4 ml-4">
        <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-white">
          Companion Care
        </div>

        <div className="text-sm">
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Pay per Hour:&nbsp;
            </span>
            $25
          </p>
          <p className="text-gray-900  dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Total Compensation:&nbsp;
            </span>
            $150
          </p>
        </div>
      </div>
      <div className="mb-4 mt-4 flex justify-around">
        <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white">
          Schedule Session
        </button>
        <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white">
          Report Post
        </button>
      </div>
    </>
  );
};

export default DemoSessionDetailsOne;
