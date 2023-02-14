// import * as Select from "@radix-ui/react-select";
import React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import SelectSessionType from "./selectSessionType";

const SearchEngine = () => {
  return (
    <>
      <div className="min-w-full">
        <div className=" flex items-center justify-center border border-blue6 bg-blue2 dark:border-darkBlue6 dark:bg-darkBlue2 ">
          <div className="hidden  md:block">
            <div className="relative rounded border border-blue7 bg-blue1 px-4 dark:border-darkBlue7 dark:bg-darkBlue1">
              <SelectSessionType />
            </div>
          </div>
          <div className="hidden justify-items-center px-3 md:mb-0 md:block md:w-1/3 lg:block">
            <input
              className="w-full rounded border border-blue7 bg-blue1 text-center text-olive12 placeholder-olive12 focus:border-blue8 focus:outline-none dark:border-darkBlue7 dark:bg-darkBlue1 dark:text-darkOlive12 dark:placeholder-darkOlive12 dark:focus:border-darkBlue8"
              id="grid-city"
              type="text"
              placeholder="Date"
            />
          </div>
          <div className="justify-items-center md:mb-0 md:w-1/3">
            <input
              className="w-full rounded border border-blue7 bg-blue1 text-center text-olive12 focus:border-blue8 focus:outline-none dark:border-darkBlue7 dark:bg-darkBlue1 dark:text-darkOlive12 dark:focus:border-darkBlue8"
              id="grid-city"
              type="text"
              // placeholder="Search"
            />
          </div>

          <button className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) dark:hover:text-gray-800 ml-3 rounded border border-solid border-blue7 px-3 text-olive12 hover:bg-[hsl(154,47%,66%)] dark:border-darkBlue7 dark:text-darkOlive12">
            Search
          </button>
          <div className="h-10">{/* //Managing heigh of search bar... */}</div>
        </div>
      </div>
    </>
  );
};

export default SearchEngine;
