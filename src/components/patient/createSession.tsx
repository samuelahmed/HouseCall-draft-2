import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { useState } from "react";
import type { CareSession } from "@prisma/client";
import { useRouter } from "next/router";

const CreateSession = () => {
  const [items, setItems] = useState<CareSession[]>([]);
  const router = useRouter();
  const { data, isLoading } = trpc.updateAccount.getOne.useQuery();
  // console.log(data?.username);

  const [inputs, setInputs] = useState({
    name: data?.username || "",
    address: data?.address || "",
    medicalNotes: "",
    overview: "",
    title: "Mobility Support",
    hourlyRate: 20,
    totalHours: 1,
    totalCompensation: 20,
    acceptedCaregiverId: "",
  });

  const totalComp = inputs.totalHours * inputs.hourlyRate;

  useEffect(() => {
    setInputs((prev) => {
      return {
        ...prev,
        totalCompensation: prev.hourlyRate * prev.totalHours,
      };
    });
  }, [inputs.hourlyRate, inputs.totalHours]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      name: data?.username || "",
      address: data?.address || "",
    }));
  }, [data?.username, data?.address]);



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
      <div className="flex flex-col items-center md:pt-12 lg:pt-24 ">
        <h3 className="text-xl font-semibold">Create new Session</h3>
        <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Type </p>
          <select
            value={inputs.title}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white"
          >
            <option>Mobility Support </option>
            <option>Personal Care</option>
            <option>Home Care</option>
            <option>Transportation</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mt-2 flex w-1/3 flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Name: </p>
          <div className="block w-full appearance-none  bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white">
            <p>{data && data?.username}</p>
          </div>
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
          <p className="mr-2 w-28 text-lg"> Hourly Rate </p>
          <input
            className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white"
            type="number"
            value={inputs.hourlyRate}
            onChange={(e) => {
              setInputs((prev) => ({
                ...prev,
                hourlyRate: parseFloat(e.target.value),
                totalCompensation: parseFloat(e.target.value) * prev.totalHours,
              }));
            }}
          />
        </div>
        <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Totals Hours </p>
          <input
            className="block w-full appearance-none rounded border border-gray-200 bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white"
            type="number"
            value={inputs.totalHours}
            onChange={(e) => {
              setInputs((prev) => ({
                ...prev,
                totalHours: parseFloat(e.target.value),
                totalCompensation: prev.hourlyRate * parseFloat(e.target.value),
              }));
            }}
          />
        </div>
        <div className="mt-2 flex w-1/3 flex-row items-center px-2 text-gray-900 dark:text-white">
          <p className="mr-2 w-28 text-lg"> Total: </p>
          <div className="block w-full appearance-none  bg-[hsl(0,0%,96%)] py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-800 dark:text-white">
            <p>{totalComp}</p>
          </div>
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
