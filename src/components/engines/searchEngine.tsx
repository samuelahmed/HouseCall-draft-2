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
        <div className=" flex items-center justify-center border border-blue6 bg-blue2 ">
          <div className="hidden  md:block">
            <div className="relative border border-blue6">
              < SelectSessionType />
            </div>
          </div>
          <div className="hidden justify-items-center  px-3 md:mb-0 md:block md:w-1/3 lg:block">
            <input
              className=" border-gray-200 text-gray-700 focus:border-gray-500 focus:bg-white dark:border-white  dark:bg-gray-800 dark:text-gray-200 w-full rounded border bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight focus:outline-none"
              id="grid-city"
              type="text"
              placeholder="Date"
            />
          </div>
          <div className="justify-items-center px-3 md:mb-0 md:w-1/3">
            <input
              className=" border-gray-200 text-gray-700 focus:border-gray-500 focus:bg-white dark:border-white dark:bg-gray-800  dark:text-gray-200 w-full appearance-none rounded border bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight focus:outline-none"
              id="grid-city"
              type="text"
              placeholder="Search"
            />
          </div>
          <button className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) border-gray-500 bg-transparent text-gray-800 dark:text-gray-100 dark:hover:text-gray-800 h-10 rounded border px-4 font-semibold hover:bg-[hsl(154,47%,66%)]">
            Search
          </button>
        </div>
      </div>
    </>
  );
};


export default SearchEngine;
