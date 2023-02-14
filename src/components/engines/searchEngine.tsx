// import * as Select from "@radix-ui/react-select";
import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import SelectSessionType from './selectSessionType';

const SearchEngine = () => {
  return (
    <>
      <div className="min-w-full">
        <div className=" flex items-center justify-center border border-blue6 bg-blue2 dark:bg-darkBlue2 dark:border-darkBlue6 ">
          <div className="hidden  md:block">
            <div className="bg-blue1 dark:bg-darkBlue1 dark:border-darkBlue7 relative border border-blue7 rounded px-4">
              < SelectSessionType />
            </div>
          </div>
          <div className="hidden justify-items-center px-3 md:mb-0 md:block md:w-1/3 lg:block">
            <input
              className="placeholder-olive12 dark:placeholder-darkOlive12 border-blue7 dark:border-darkBlue7 focus:border-blue8 dark:focus:border-darkBlue8 dark:bg-darkBlue1 text-olive12 dark:text-darkOlive12 w-full rounded border bg-blue1 text-center focus:outline-none"
              id="grid-city"
              type="text"
              placeholder="Date"
            />
          </div>
          <div className="justify-items-center px-3 md:mb-0 md:w-1/3">
            <input
              className="border-blue7 dark:border-darkBlue7 focus:border-blue8 dark:focus:border-darkBlue8 dark:bg-darkBlue1 text-olive12 dark:text-darkOlive12 w-full rounded border bg-blue1 text-center focus:outline-none"
              id="grid-city"
              type="text"
              // placeholder="Search"
            />
          </div>

          <button className=" border-solid hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) border-blue7 dark:border-darkBlue7 text-olive12 dark:text-darkOlive12 dark:hover:text-gray-800 rounded border px-4 hover:bg-[hsl(154,47%,66%)]">
            Search
          </button>
          <div className='h-10'>
            {/* //Managing heigh of search bar... */}
          </div>
        </div>
      </div>
    </>
  );
};


export default SearchEngine;
