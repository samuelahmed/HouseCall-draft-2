import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../../components/layout/navLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/layout/footer";
import SearchEngine from "@/components/engines/searchEngine";
import FindTab from "@/components/caregiver/findTab";
import HistoryTab from "@/components/caregiver/historyTab";
import ActiveTab from "@/components/caregiver/activeTab";
import SideNav from "@/components/layout/sideNav";

import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Switch from "@radix-ui/react-switch";
import * as Separator from "@radix-ui/react-separator";

import {
  ChatBubbleIcon,
  FaceIcon,
  PersonIcon,
  CalendarIcon,
  IdCardIcon,
  ArchiveIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const Caregiver: NextPage = (props) => {
  const { data: session } = useSession();
  const [openSide, setOpenSide] = useState(0);
  const [openTab, setOpenTab] = useState(1);
  const [rightCard, setRightCard] = useState(1);
  const { data, isLoading } = trpc.careSessionAPIs.readAllSessions.useQuery();
  const router = useRouter();

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
      <Head>
        <title>Caregiver Dashbaord</title>
      </Head>
      {/* <header className="h-14"></header> */}
      <NavLayout />

      <div>
        {session && (
          <>
            <main
              className="
            grid min-h-95vh grid-cols-1
           bg-blue1
           dark:bg-darkBlue1 
             md:grid-cols-6
            "
            >
              <div
                className="
               col-span-1 hidden
              min-h-max bg-slate12 
             text-olive2 
             md:flex
              lg:block 
              "
              >
                <div
                  className="
                  flex flex-col items-baseline space-y-2 pl-8 pt-4 text-lg
                "
                >
                  <Link href={"/help"} className="flex flex-row items-center">
                    <FaceIcon className="mr-2" />
                    Discover
                  </Link>
                  <Link href={"/help"} className="flex flex-row items-center">
                    <IdCardIcon className="mr-2" />
                    Applied
                  </Link>

                  <Link href={"/help"} className="flex flex-row items-center">
                    <CalendarIcon className="mr-2" />
                    Scheduled
                  </Link>

                  <Link href={"/help"} className="flex flex-row items-center">
                    <ArchiveIcon className="mr-2" />
                    History
                  </Link>

                  <Link href={"/help"} className="flex flex-row items-center">
                    <ChatBubbleIcon className="mr-2" />
                    Messages
                  </Link>
                  <Link href={"/help"} className="flex flex-row items-center">
                    <PersonIcon className="mr-2" />
                    Account
                  </Link>
                  <Link href={"/help"} className="flex flex-row items-center">
                    <QuestionMarkIcon className="mr-2" />
                    Help
                  </Link>
                </div>
              </div>

              <div
                className="
                col-span-5 min-h-90vh min-w-max
                bg-blue1 dark:bg-darkBlue1
                "
              >
                <div
                  className="
                mx-4 mt-4
                grid min-h-90vh
                grid-cols-2
                gap-x-1
                bg-blue1
                dark:bg-darkBlue1	                "
                >
                  <div
                    className="
                    col-span-2
                    max-h-90vh overflow-scroll
                    border
                    border-blue6 bg-blue2
                    dark:border-darkBlue6
                    dark:bg-darkBlue1
                    md:col-span-1
                  
                  "
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
                                // this className makes the cards
                                className="boder-gray-400 bg-white hover:bg-gray-100 dark:border-gray-400 dark:bg-gray-800 dark:hover:bg-gray-600 mx-2 mb-2 cursor-pointer items-center justify-around rounded-lg border px-2"
                              >
                                <div
                                  onClick={() => {
                                    setInputs({
                                      id: id,
                                      title: title || "still loading",
                                      name: name || "still loading",
                                      address: address || "still loading",
                                      overview: overview || "still loading",
                                      sessionType:
                                        sessionType || "still loading",
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
                                  className="mb-8"
                                >
                                  <div className="">{title}</div>
                                  <p className="">
                                    <span className="">Status:&nbsp;</span>
                                    {careSessionStatus}
                                  </p>
                                  <p className="">
                                    <span className="">Name:&nbsp;</span>
                                    {name}
                                  </p>
                                  <p className="">
                                    <span className="">Address:&nbsp;</span>
                                    {address}
                                  </p>
                                  <p className="">
                                    <span className="">Overview:&nbsp;</span>
                                    {overview}
                                  </p>
                                  <p className="">
                                    <span className="">
                                      Total Compensation:&nbsp;
                                    </span>
                                    ${totalCompensation}
                                  </p>
                                </div>
                                <div className="mb-4 flex flex-col items-center justify-center">
                                  <button
                                    onClick={() =>
                                      router.push(`/careSession/${data.slug}`)
                                    }
                                    className="border-gray-500 bg-transparent text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white h-10 rounded border px-4 pt-2 pb-8 font-semibold md:hidden lg:hidden"
                                  >
                                    Schedule Session
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
                    className="
                    hidden border
                    border-blue6 bg-blue2
                    dark:border-darkBlue6
                    dark:bg-darkBlue1 md:col-span-1
                    md:block
                  "
                  >
                    {/* Right Table */}
                    {/* this className is for the right card */}
                    <div className="border-gray-400 bg-white dark:bg-gray-800 flex  min-w-max flex-col justify-between rounded-xl border mt-4 mx-2 min-h-85vh">
                      <div className={rightCard === 1 ? "" : "hidden"}>
                        <div className="mb-4 mr-4 ml-4 justify-center ">
                          <div className="text-gray-800 dark:text-gray-100 mb-2 p-4 text-center text-xl">
                            {selectedSession?.data?.title || isLoading}
                          </div>
                          <div className="text-sm">
                            <p className="text-gray-900 dark:text-gray-100">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                Status:&nbsp;
                              </span>
                              {selectedSession?.data?.careSessionStatus ||
                                isLoading}
                            </p>
                            <p className="text-gray-900 dark:text-gray-100">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                Name:&nbsp;
                              </span>
                              {selectedSession?.data?.name || isLoading}
                            </p>
                            <p className="text-gray-900 dark:text-gray-100">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                Address:&nbsp;
                              </span>
                              {selectedSession?.data?.address || isLoading}
                            </p>
                            <p className="text-gray-900 dark:text-gray-100">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                Medical Notes:&nbsp;
                              </span>
                              {selectedSession?.data?.medicalNotes || isLoading}
                            </p>
                            <p className="text-gray-900 dark:text-gray-100">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                Overview:&nbsp;
                              </span>
                              {selectedSession?.data?.overview || isLoading}
                            </p>
                            <p className="text-gray-900 dark:text-gray-100">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                Hourly Rate:&nbsp;
                              </span>
                              ${selectedSession?.data?.hourlyRate || isLoading}
                            </p>
                            <p className="text-gray-900 dark:text-gray-100">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                Hours:&nbsp;
                              </span>
                              {selectedSession?.data?.totalHours || isLoading}
                            </p>
                            <p className="text-gray-900 dark:text-gray-100">
                              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                Total:&nbsp;
                              </span>
                              $
                              {selectedSession?.data?.totalCompensation ||
                                isLoading}
                            </p>
                            <div className="flex flex-col items-center justify-center">
                              <button
                                onClick={() =>
                                  router.push(
                                    `/careSession/${selectedSession.data?.slug}`
                                  )
                                }
                                className="hover:border-hsl(0,0%,6%) hover:text-hsl(0,0%,6%) border-gray-500 bg-transparent text-gray-800 dark:text-gray-100 dark:hover:text-gray-800 mt-6 h-10 rounded border px-4 pt-2 pb-8 font-semibold hover:bg-[hsl(154,47%,66%)]"
                              >
                                Schedule
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </>
        )}
        {!session && <></>}
      </div>
    </>
  );
};

export default Caregiver;
