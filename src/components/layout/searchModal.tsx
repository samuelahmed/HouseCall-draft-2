import { useState } from "react";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { Button } from "../ui/button";

const SearchModal = () => {
  const [showModal, setShowModal] = useState(false);

  //close modal if clicked outside of it

  return (
    <>
      <form
        onClick={() => (showModal ? setShowModal(false) : setShowModal(true))}
        className="min-w-full"
      >
        <div className="relative ">
          <div
            className="absolute right-2 bottom-2"
            onClick={() => console.log("search")}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-olive12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            id="default-search"
            className="block w-full border  bg-blue2 p-1.5 pl-4 text-sm text-olive12 focus:outline-none focus:ring-1 focus:ring-blue11 "
            placeholder="Search Sessions"
            required
          />
        </div>
      </form>

      {/* 
      
      <input
        id="default-search"
        className="block w-full border  bg-blue2 p-1.5 pl-4 text-sm text-olive12 focus:outline-none focus:ring-1 focus:ring-blue11 "
        placeholder="Search Sessions"
        required
        onClick={() => (showModal ? setShowModal(false) : setShowModal(true))}
      /> */}
      {showModal ? (
        <>
          <div className="absolute z-50 flex h-96 w-1/2 place-items-center  border bg-yellow9 md:w-1/3  ">
            Insert search results here
            <Button
              variant="redButton"
              size="default"
              className="absolute inset-x-0 bottom-0 "
              onClick={() => setShowModal(false)}
            >
              close Search
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SearchModal;
