const SearchEngine = () => {
  return (
    <>
      <div className="h-14 w-full rounded border-gray-200 ">
        <div className="mx-1 flex justify-center items-center rounded bg-[hsl(0,0%,88%)]  dark:bg-gray-700">
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
              className=" w-full rounded border border-gray-200 bg-[hsl(0,0%,96%)]  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-gray-200"
              id="grid-city"
              type="text"
              placeholder="City"
            />
          </div>
          <div className="justify-items-center px-3 md:mb-0 md:w-1/3">
            <input
              className=" w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)]  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-gray-200"
              id="grid-city"
              type="text"
              placeholder="Search"
            />
          </div>
            <button className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) h-10 rounded border border-gray-500 bg-transparent px-4 font-semibold text-gray-800 hover:bg-[hsl(154,47%,66%)] dark:text-gray-100 dark:hover:text-gray-800">
              Search
            </button>
        </div>
      </div>
    </>
  );
};

export default SearchEngine;
