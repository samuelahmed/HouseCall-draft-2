const SearchEngine = () => {
  return (
    <>
      <div className="flex w-11/12 justify-center rounded  bg-gray-100 pr-2 pl-1 pt-4 dark:bg-gray-900 ">
        <div className="hidden w-full px-3 md:mb-0 md:block md:w-1/3 lg:block">
          <div className="relative">
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white"
              id="grid-state"
            >
              <option>All Care Types</option>
              <option>Companion Care</option>
              <option>Mobility Support</option>
              <option>Personal Care</option>
              <option>Nutrition Assistance</option>
              <option>Conversation</option>
              <option>Personal Care Services</option>
            </select>
          </div>
        </div>
        <div className="hidden justify-items-center  px-3 md:mb-0 md:block md:w-1/3 lg:block">
          <input
            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white"
            id="grid-city"
            type="text"
            placeholder="City"
          />
        </div>
        <div className="justify-items-center px-3 md:mb-0 md:w-1/3">
          <input
            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white"
            id="grid-city"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="shrink pr-4 ">
          <button className="hover:bg-grey-200 h-10 rounded border border-gray-500 bg-transparent  px-4 pt-2 font-semibold text-gray-700 hover:border-blue-700 hover:text-blue-700 dark:border-white dark:bg-gray-900 dark:text-white dark:hover:border-blue-200 dark:hover:text-blue-200">
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchEngine;
