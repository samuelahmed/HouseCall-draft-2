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
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900  dark:text-white">
              Date:&nbsp;
            </span>
            Saturday January 7, 2023
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Time:&nbsp;
            </span>
            11:00am - 5:00pm
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Total Hours:&nbsp;
            </span>
            6
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Address:&nbsp;
            </span>
            2830 West Field Drive, San Jose
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Age:&nbsp;
            </span>
            76
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Medical Notes:&nbsp;
            </span>
            None
          </p>
        </div>
        <p className="pt-4 text-base text-gray-800 dark:text-white">
          <span className="font-semibold text-gray-900 dark:text-white">
            Overview:&nbsp;
          </span>
          Hi, I am stephanie, it would help a lot to have someone visit and talk
          a few times a week. My grandchildren moved away and I spend a lot of
          time alone now.
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

export default DemoSessionDetailsOne;
