const DemoSessionDetailsTwo = () => {
  return (
    <>
      <div className="mt-4 flex items-center justify-around text-sm">
        <p className="text-gray-900 dark:text-white">Milpitas</p>
        <p className="text-gray-900 dark:text-white">
          Saturday January 3, 2023
        </p>
        <p className="text-gray-900 dark:text-white">6:00am - 11:00am</p>
        <p className="text-gray-900 dark:text-white">$35 / hour</p>
      </div>
      <div className="mb-4 mr-4 ml-4">
        <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-white">
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
          I need help walking around and taking walks to the park to stay active
        </p>
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

export default DemoSessionDetailsTwo;
