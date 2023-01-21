const SearchEngine = () => {
  return (
    <>
      <div className="w-full  rounded border-gray-200 pb-1">
        <div className="flex justify-center rounded  bg-[hsl(0,0%,88%)] pr-2 pl-1 pt-2 pb-2 dark:bg-gray-700 mx-1">
          <div className="hidden w-full px-3 md:mb-0 md:block md:w-1/3 lg:block">
            <div className="relative">
              <select
                className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-gray-200"
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
              className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)]  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-gray-200"
              id="grid-city"
              type="text"
              placeholder="City"
            />
          </div>
          <div className="justify-items-center px-3 md:mb-0 md:w-1/3">
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)]  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-gray-200"
              id="grid-city"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="justify-items-center px-3 md:mb-0 md:w-1/3">

          <button
          className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) mt-6 h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-800 hover:bg-[hsl(154,47%,66%)] dark:text-gray-100 dark:hover:text-gray-800">
              Search
            </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default SearchEngine;
