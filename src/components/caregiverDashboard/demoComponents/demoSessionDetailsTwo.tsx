import { trpc } from "@/utils/trpc";
import { contextProps } from "@trpc/react-query/dist/internals/context";
import { useSession } from "next-auth/react";

const DemoSessionDetailsTwo = () => {
  const { data: session } = useSession();

  const { data, isLoading } = trpc.sessionAPIs.getOneSessionTwo.useQuery({
    id: "1",
  });

  console.log(data);

  return (
    <>
      <div className="mt-4 flex items-center justify-around text-sm">
        <p className="text-gray-900 dark:text-white">Mountain View</p>
        <p className="text-gray-900 dark:text-white">
          Saturday January 4, 2023
        </p>
        <p className="text-gray-900 dark:text-white">9:00am - 5:00pm</p>
        <p className="text-gray-900 dark:text-white">$20 / hour</p>
      </div>
      <div className="mb-4 mr-4 ml-4">
        <div className="mb-2 p-4 text-center text-xl  text-gray-800 dark:text-white">
          Personal Care
        </div>

        <div className="text-sm">
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Pay per Hour:&nbsp;
            </span>
            $20
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Total Compensation:&nbsp;
            </span>
            $160
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Date:&nbsp;
            </span>
            Friday January 4, 2023
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Time:&nbsp;
            </span>
            9:00am - 5:00pm
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Total Hours:&nbsp;
            </span>
            8
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Address:&nbsp;
            </span>
            113 Bloom Street, Mountain View
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Age:&nbsp;
            </span>
            72
          </p>
          <p className="text-gray-900 dark:text-white">
            <span className="font-semibold text-gray-900 dark:text-white">
              Medical Notes:&nbsp;
            </span>
            Diabetic
          </p>
        </div>
        <p className="pt-4 text-base text-gray-800 dark:text-white">
          <span className="font-semibold text-gray-900 dark:text-white">
            Overview:&nbsp;
          </span>
          Need support throughout the day with general activities
        </p>
      </div>
      <div className="mb-4 mt-4 flex justify-around">
        <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:border-white dark:text-white">
          Schedule Session
        </button>
        <button className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:border-white dark:text-white">
          Report Post
        </button>
      </div>
    </>
  );
};

export default DemoSessionDetailsTwo;
