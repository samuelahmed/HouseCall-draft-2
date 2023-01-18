import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { useState } from "react";
import type { CareSession } from "@prisma/client";
import { useRouter } from "next/router";

const CreateSession = () => {
  const [items, setItems] = useState<CareSession[]>([]);
  const router = useRouter();

  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    medicalNotes: "",
    overview: "",
    title: "",
  });

  useEffect(() => {
    setInputs({
      name: "",
      address: "",
      medicalNotes: "",
      overview: "",
      title: "",
    });
  }, []);

  const publish = () => {
    mutate(inputs);
  };

  const { mutate } = trpc.sessionAPIs.createOneSession.useMutation({
    onSuccess(newSession) {
      alert("Meow! Session successfully created!");
      setItems((prev) => [...prev, newSession]);
      router.push(`/session/${newSession.slug}`);
    },
  });

  return (
    <>
      <div className="mx-4  mt-6 flex h-screen flex-col items-center md:mt-12 lg:mt-24 ">
        <h3 className="text-xl font-semibold">Create new Session</h3>
        <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Title </p>
          <input
            type="text"
            value={inputs.title}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Name </p>
          <input
            type="text"
            value={inputs.name}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Address </p>

          <input
            type="text"
            value={inputs.address}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Medical Notes </p>
          <input
            type="text"
            value={inputs.medicalNotes}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                medicalNotes: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Overview </p>
          <input
            type="text"
            value={inputs.overview}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                overview: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 justify-items-center gap-8">
          <button
            type="button"
            onClick={() => {
              publish();
            }}
            className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-800 hover:bg-[hsl(154,47%,66%)] dark:text-gray-100 dark:hover:text-gray-800"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateSession;
