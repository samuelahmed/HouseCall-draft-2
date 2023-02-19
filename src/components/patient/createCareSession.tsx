import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { useState } from "react";
import type { CareSession } from "@prisma/client";
import { useRouter } from "next/router";

const CreateSession = () => {
  const [items, setItems] = useState<CareSession[]>([]);
  const router = useRouter();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();

  const { mutate } = trpc.careSessionAPIs.createOneCareSession.useMutation({
    onSuccess(newSession) {
      alert("Meow! Session successfully created!");
      setItems((prev) => [...prev, newSession]);
      router.push('/dashboard/patient/pending');
    },
  });

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
    careSessionStatus: "",
  });

  const totalComp = inputs.totalHours * inputs.hourlyRate;

  useEffect(() => {
    setInputs((prev) => {
      return {
        ...prev,
        totalCompensation: prev.hourlyRate * prev.totalHours,
        careSessionStatus: "New",
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

  return (
    <>
      <div className="flex flex-col items-center md:pt-12 lg:pt-24">
        <h3 className="text-xl font-semibold">Create new Session</h3>
        <div className="mt-2 flex flex-row items-center px-2 text-olive12 dark:text-darkOlive12">
          <p className="mr-2 w-28"> Type </p>
          <select
            value={inputs.title}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1 text-sm"
          >
            <option>Mobility Support </option>
            <option>Personal Care</option>
            <option>Home Care</option>
            <option>Transportation</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mt-2 flex flex-row items-center px-2">
          <p className="mr-2 w-28"> Name: </p>
          <div className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1 text-sm">
            <p>{data && data?.username}</p>
          </div>
        </div>
        <div className="mt-2 flex flex-row items-center px-2">
          <p className="mr-2 w-28"> Address </p>
          <input
            type="text"
            value={inputs.address}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1 text-sm"
          />
        </div>
        <div className="mt-2 flex flex-row items-center px-2">
          <p className="mr-2 w-28"> Overview </p>
          <input
            type="text"
            value={inputs.overview}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                overview: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1 text-sm"
          />
        </div>
        <div className="mt-2 flex flex-row items-center px-2">
          <p className="mr-2 w-28"> Medical Notes </p>
          <input
            type="text"
            value={inputs.medicalNotes}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                medicalNotes: e.target.value,
              }))
            }
            className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1 text-sm"
          />
        </div>
        <div className="mt-2 flex flex-row items-center px-2">
          <p className="mr-2 w-28"> Hourly Rate </p>
          <input
            className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1 text-sm"
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
        <div className="mt-2 flex flex-row items-center px-2">
          <p className="mr-2 w-28"> Totals Hours </p>
          <input
            className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1 text-sm"
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
        <div className="mt-2 flex w-1/3 flex-row items-center px-2">
          <p className="mr-2 w-28"> Total: </p>
          <div className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1 text-sm">
            <p>${totalComp}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 justify-items-center gap-8">
          <button
            type="button"
            onClick={() => {
              publish();
            }}
            className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) border-gray-500 bg-transparent text-gray-800 dark:text-gray-100 dark:hover:text-gray-800 h-10 rounded border px-4 pt-2 pb-8 font-semibold hover:bg-[hsl(154,47%,66%)]"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateSession;
