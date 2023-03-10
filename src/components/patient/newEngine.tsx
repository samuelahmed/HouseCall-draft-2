import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const NewEngine = () => {
  const router = useRouter();
  const [rightCard, setRightCard] = useState(1);
  const { data, isLoading } =
    trpc.careSessionAPIs.readAllNewSessionsByUser.useQuery();

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
    city: "",
    postalCode: "",
    sessionStartHour: 0,
    sessionStartMinute: 0,
    sessionEndHour: 0,
    sessionEndMinute: 0,
    sessionMonth: 0,
    sessionDay: 0,
    sessionYear: 0,
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
                  city,
                  postalCode,
                  sessionStartHour,
                  sessionStartMinute,
                  sessionEndHour,
                  sessionEndMinute,
                  sessionMonth,
                  sessionDay,
                  sessionYear,
                } = data;

                const startTimeHour = sessionStartHour || 0;
                const startTimeMinute = sessionStartMinute || 0;
                const endTimeHour = sessionEndHour || 0;
                const endTimeMinute = sessionEndMinute || 0;



                let sessionDurationHours = endTimeHour - startTimeHour;
                let sessionDurationMinutes = endTimeMinute - startTimeMinute;
                if (sessionDurationMinutes < 0) {
                  sessionDurationHours--;
                  sessionDurationMinutes += 60;
                }


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
                          city: city || "still loading",
                          postalCode: postalCode || "still loading",
                          sessionStartHour: startTimeHour,
                          sessionStartMinute: startTimeMinute,
                          sessionEndHour: endTimeHour,
                          sessionEndMinute: endTimeMinute,
                          sessionMonth: sessionMonth || 0,
                          sessionDay: sessionDay || 0,
                          sessionYear: sessionYear || 0,

                          hourlyRate: Number(data.hourlyRate) || 0,
                          totalHours: Number(data.totalHours) || 0,
                          totalCompensation:
                            Number(data.totalCompensation) ||
                            (Number(totalHours) || 0) *
                              (Number(hourlyRate) || 0),
                        });
                      }}
                      className="mb-1 text-sm"
                    >
                      <div className="pt-2 text-center text-lg font-semibold">
                        {title}
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="col-span-1 text-left">
                        <p className="">
                              <span className=" font-semibold">
                                Date:&nbsp;
                              </span>
                              {sessionMonth} / {sessionDay} / {sessionYear}
                            </p>

                          <p className="">
                            <span className="font-semibold">
                              Session Start:&nbsp;
                            </span>
                            {startTimeHour > 12
                              ? startTimeHour - 12
                              : startTimeHour}
                            :
                            {startTimeMinute < 10
                              ? "0" + startTimeMinute
                              : startTimeMinute}{" "}
                            {startTimeMinute > 12 ? "PM" : "AM"}
                          </p>

                          <p className="">
                            <span className="font-semibold">
                              Session End:&nbsp;
                            </span>
                            {endTimeHour > 12 ? endTimeHour - 12 : endTimeHour}{" "}
                            :{" "}
                            {endTimeMinute < 10
                              ? "0" + endTimeMinute
                              : endTimeMinute}{" "}
                            {endTimeHour > 12 ? "PM" : "AM"}
                          </p>
                        </div>

                        <div className="col-span-1 text-left">
                          <p className="">
                            <span className="font-semibold">
                              Address:&nbsp;
                            </span>
                            {address}
                          </p>
                          <p className="">
                            <span className="font-semibold">City:&nbsp;</span>
                            {city}
                          </p>
                          <p className="">
                            <span className="font-semibold">
                              Postal Code:&nbsp;
                            </span>
                            {postalCode}
                          </p>
                        </div>
                      </div>

                      <p className="">
                        <span className=" font-semibold">
                          Session Overview:&nbsp;
                        </span>
                        <textarea
                          className="inline-block h-16 w-full border border-blue7
                           bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
                          id="firstName"
                          defaultValue={overview || ""}
                          readOnly={true}
                        />
                      </p>
                      <div className="grid grid-cols-2">
                        <div className="col-span-1 text-left">

                        <p className="">
                              <span className=" font-semibold">
                                Duration:&nbsp;
                              </span>
                              {sessionDurationHours} hours{" "}
                              {sessionDurationMinutes} minutes
                            </p>
                            <p className="">
                            <span className=" font-semibold">
                              Compensation Per Hour:&nbsp;
                            </span>
                            ${hourlyRate}
                          </p>

                        </div>

                        <div className="col-span-1 text-left">
                          <p>
                            &nbsp;
                            {/* this paragraph is just for spacing - maybe find a cleaner way */}
                          </p>
                          <p className="">
                            <span className="font-semibold">
                              Total Compensation:&nbsp;
                            </span>
                            ${totalCompensation}
                          </p>
                        </div>
                      </div>
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

export default NewEngine;
