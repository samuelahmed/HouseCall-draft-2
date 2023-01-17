import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const DemoSessionOverviewOne = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();
  const router = useRouter();

  return (
    <ul>
      {data
        ?.map((data) => {
          const { id, title, name, address, medicalNotes, overview } = data;
          return (
            <li
              key={id}
              className="mb-2 cursor-pointer items-center justify-around rounded border-2 border-gray-300 bg-white px-2 hover:bg-gray-100 dark:border-gray-400 dark:bg-sky-900"
            >
              <div className="mb-8">
                <div className="mb-2 p-4 text-center text-xl text-gray-800 dark:text-white">
                  {title}
                </div>
                <p className="text-sm text-gray-700 dark:text-white">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Overview:&nbsp;
                  </span>
                  {overview}
                </p>
                <p className="text-sm text-gray-700 dark:text-white">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Medical Notes:&nbsp;
                  </span>
                  {medicalNotes}
                </p>
                <p className="text-sm text-gray-700 dark:text-white">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Name:&nbsp;
                  </span>
                  {name}
                </p>
                <p className="text-sm text-gray-700 dark:text-white">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Address:&nbsp;
                  </span>
                  {address}
                </p>
              </div>

              <button
                onClick={() => router.push(`/session/${data.slug}`)}
                className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
              >
                Learn More
              </button>
              <button
                onClick={() => console.log(id)}
                className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white"
              >
                Report Post
              </button>
            </li>
          );
        })
        .reverse()}
    </ul>
  );
};

export default DemoSessionOverviewOne;
