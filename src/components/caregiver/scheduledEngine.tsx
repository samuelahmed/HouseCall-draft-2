import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const ScheduledEngine = () => {
  const router = useRouter();
  const [rightCard, setRightCard] = useState(1);
  const { data, isLoading } =
    trpc.careSessionAPIs.readAllScheduledPotentialSessionsByUser.useQuery();

  const [inputs, setInputs] = useState({
    title: "",
    id: "",
    name: "",
    address: "",
    overview: "",
    sessionType: "",
    hourlyRate: 0,
    totalHours: 0,
    totalCompensation: 0,
    careSessionStatus: "",
  });

  const selectedSession =
    trpc.careSessionAPIs.readOneSessionBySessionId.useQuery({
      id: inputs?.id || (data?.[data?.length - 1]?.id ?? "0"),
    });

  return (
    <>
      <div
        className="col-span-2 max-h-85vh overflow-scroll border 
  border-blue6 bg-blue2 dark:border-darkBlue6 dark:bg-darkBlue2 md:col-span-1"
      >
        {/* Left Table */}
        <div
          className="mt-4"
          onClick={(e) => {
            e.preventDefault();
            setRightCard(1);
          }}
        >
          <ul>
            {data
              ?.map((data) => {
                const {
                  id,
                  title,
                  name,
                  address,
                  overview,
                  sessionType,
                  hourlyRate,
                  totalHours,
                  totalCompensation,
                  careSessionStatus,
                } = data;
                return (
                  <li
                    key={id}
                    className="mx-2 mb-2 items-center justify-around rounded-sm border
                  border-blue6 bg-blue1 px-2 text-olive12 hover:bg-blue2 dark:border-darkBlue6
                 dark:bg-darkBlue1 dark:text-darkOlive12 dark:hover:bg-darkBlue2 md:cursor-pointer"
                  >
                    <div
                      onClick={() => {
                        setInputs({
                          id: id,
                          title: title || "still loading",
                          name: name || "still loading",
                          address: address || "still loading",
                          overview: overview || "still loading",
                          sessionType: sessionType || "still loading",
                          careSessionStatus:
                            careSessionStatus || "still loading",
                          hourlyRate: Number(data.hourlyRate) || 0,
                          totalHours: Number(data.totalHours) || 0,
                          totalCompensation:
                            Number(data.totalCompensation) ||
                            (Number(totalHours) || 0) *
                              (Number(hourlyRate) || 0),
                        });
                      }}
                      className="mb-8 text-sm"
                    >
                      <div className="pt-2 text-center text-lg font-semibold">
                        {title}
                      </div>
                      <p className="">
                        <span className="font-semibold">Status:&nbsp;</span>
                        {careSessionStatus}
                      </p>
                      <p className="">
                        <span className="font-semibold">Name:&nbsp;</span>
                        {name}
                      </p>
                      <p className="">
                        <span className="font-semibold">Address:&nbsp;</span>
                        {address}
                      </p>
                      <p className="">
                        <span className="font-semibold">Overview:&nbsp;</span>
                        {overview}
                      </p>
                      <p className="">
                        <span className="font-semibold">
                          Total Compensation:&nbsp;
                        </span>
                        ${totalCompensation}
                      </p>
                    </div>
                    <div className="mb-4 flex flex-col items-center justify-center">
                      <button
                        onClick={() => router.push(`/careSession/${data.slug}`)}
                        className="ml-3 cursor-pointer border  border-solid border-blue7 bg-blue3 px-3 text-olive12 hover:border-blue8 hover:bg-blue4
                     dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4 md:hidden"
                      >
                        Details
                      </button>
                    </div>
                  </li>
                );
              })
              .reverse()}
          </ul>
        </div>
      </div>
      <div
        className="hidden max-h-85vh border border-blue6 bg-blue2 text-olive12 
    dark:border-darkBlue6 dark:bg-darkBlue2 dark:text-darkOlive12 md:col-span-1 md:block"
      >
        {/* Right Table */}
        <div
          className="mx-2 mt-4 flex min-h-80vh min-w-max flex-col justify-between rounded-sm border 
    border-blue6 bg-blue1 dark:border-darkBlue6 dark:bg-darkBlue1"
        >
          <div className={rightCard === 1 ? "" : "hidden"}>
            <div className="mb-4 mr-4 ml-4 justify-center ">
              <div className="mb-2 p-4 text-center text-2xl font-semibold">
                {selectedSession?.data?.title || isLoading}
              </div>
              <div className="text-sm">
                <p className="">
                  <span className="font-semibold">Status:&nbsp;</span>
                  {selectedSession?.data?.careSessionStatus || isLoading}
                </p>
                <p className="">
                  <span className="font-semibold">Name:&nbsp;</span>
                  {selectedSession?.data?.name || isLoading}
                </p>
                <p className="">
                  <span className="font-semibold">Address:&nbsp;</span>
                  {selectedSession?.data?.address || isLoading}
                </p>
                <p className="">
                  <span className="font-semibold">Medical Notes:&nbsp;</span>
                  {selectedSession?.data?.medicalNotes || isLoading}
                </p>
                <p className="">
                  <span className="font-semibold">Overview:&nbsp;</span>
                  {selectedSession?.data?.overview || isLoading}
                </p>
                <p className="">
                  <span className="font-semibold">Hourly Rate:&nbsp;</span>$
                  {selectedSession?.data?.hourlyRate || isLoading}
                </p>
                <p className="">
                  <span className="font-semibold">Hours:&nbsp;</span>
                  {selectedSession?.data?.totalHours || isLoading}
                </p>
                <p className="">
                  <span className="font-semibold">Total:&nbsp;</span>$
                  {selectedSession?.data?.totalCompensation || isLoading}
                </p>
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={() =>
                      router.push(`/careSession/${selectedSession.data?.slug}`)
                    }
                    className="ml-3 cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
                 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduledEngine;
