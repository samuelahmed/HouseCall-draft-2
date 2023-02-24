import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { useState } from "react";
import type { CareSession } from "@prisma/client";
import { useRouter } from "next/router";
import * as Label from "@radix-ui/react-label";

const CreateSession = () => {
  const [items, setItems] = useState<CareSession[]>([]);
  const router = useRouter();
  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();

  const { mutate } = trpc.careSessionAPIs.createOneCareSession.useMutation({
    onSuccess(newSession) {
      alert("Meow! Session successfully created!");
      setItems((prev) => [...prev, newSession]);
      router.push("/dashboard/patient/new");
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


    <div className="min-h-screen">

    </div>







      <div className="flex flex-col items-center md:pt-12 lg:pt-24">
        <h3 className="text-xl font-semibold">Create new Session</h3>
        <div className="align-baseline">
          <div className="mt-2 flex flex-row items-center  text-olive12 dark:text-darkOlive12">



            {/* //example label and input from radix-ui */}
            <div className="flex flex-wrap items-center gap-[15px] px-5">
              <Label.Root
                className="text-white text-[15px] font-medium leading-[35px]"
                htmlFor="firstName"
              >
                First name
              </Label.Root>
              <input
                className="bg-blackA5 shadow-blackA9 text-white inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black]"
                type="text"
                id="firstName"
                defaultValue=""
              />
            </div>
            {/* end of example */}

            <p className=" w-48"> Type </p>
            <select
              value={inputs.title}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
            >
              <option>Mobility Support </option>
              <option>Personal Care</option>
              <option>Home Care</option>
              <option>Transportation</option>
              <option>Other</option>
            </select>
          </div>


          <div className="mt-2 flex flex-row items-center ">
            <p className=" w-48"> Name: </p>
            <div className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1">
              <p>{data && data?.username}</p>
            </div>
          </div>



          
          <div className="mt-2 flex flex-row items-center ">
            <p className=" w-48"> Address </p>
            <input
              type="text"
              value={inputs.address}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
            />
          </div>
          <div className="mt-2 flex flex-row items-center ">
            <p className=" w-48"> Overview </p>
            <input
              type="text"
              value={inputs.overview}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  overview: e.target.value,
                }))
              }
              className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
            />
          </div>
          <div className="mt-2 flex flex-row items-center ">
            <p className=" w-48"> Medical Notes </p>
            <input
              type="text"
              value={inputs.medicalNotes}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  medicalNotes: e.target.value,
                }))
              }
              className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
            />
          </div>
          <div className="mt-2 flex flex-row items-center ">
            <p className=" w-48"> Hourly Rate </p>
            <input
              className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
              type="number"
              value={inputs.hourlyRate}
              onChange={(e) => {
                setInputs((prev) => ({
                  ...prev,
                  hourlyRate: parseFloat(e.target.value),
                  totalCompensation:
                    parseFloat(e.target.value) * prev.totalHours,
                }));
              }}
            />
          </div>
          <div className="mt-2 flex flex-row items-center ">
            <p className=" w-48"> Totals Hours </p>
            <input
              className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
              type="number"
              value={inputs.totalHours}
              onChange={(e) => {
                setInputs((prev) => ({
                  ...prev,
                  totalHours: parseFloat(e.target.value),
                  totalCompensation:
                    prev.hourlyRate * parseFloat(e.target.value),
                }));
              }}
            />
          </div>
          <div className="items-right mt-2 flex w-1/3 flex-row ">
            <p className=" w-48"> Total: </p>

            <div className="ml-36">
              <p>${totalComp}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 justify-items-center gap-8">
            <button
              type="button"
              onClick={() => {
                publish();
              }}
              className="ml-3 cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
            dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="row-span-1 flex items-center justify-center border border-blue7 bg-blue1 dark:border-darkBlue7 dark:bg-darkBlue1">
                <button
                  type="button"
                  onClick={() => {
                    publish();
                  }}
                  className="cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
            dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                >
                  Create
                </button>
              </div>
    </>
  );
};

export default CreateSession;
