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
            grid  grid-cols-1
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
                  <Link href={"/caregiver/radix"} className="flex flex-row items-center">
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
                col-span-5  min-w-max
                bg-blue1 dark:bg-darkBlue1
                "
              >
                <div
                  className="
                  mx-4 mt-4 mb-1
                  flex items-center
                text-olive12 dark:text-darkOlive12"
                >
                  <SearchEngine />
                </div>

                <div
                  className="
                mx-4 
                grid min-h-88vh
                grid-cols-2
                gap-x-1
                bg-blue1
                dark:bg-darkBlue1	                "
                >
                  <div
                    className="
                    col-span-2
                    max-h-85vh overflow-scroll
                    border
                    border-blue6 bg-blue2
                    dark:border-darkBlue6
                    dark:bg-darkBlue2
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
                                className="hover:bg-gray-100 dark:hover:bg-gray-600 mx-2 mb-2 rounded-sm
                                 md:cursor-pointer items-center justify-around border border-blue6 bg-blue1 px-2 text-olive12 dark:border-darkBlue6
                                 dark:bg-darkBlue1 dark:text-darkOlive12
                                 hover:bg-blue4 dark:hover:bg-darkBlue4
                                 "
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
                                  className="mb-8 text-sm"
                                >
                                  <div className="pt-2 text-center text-lg font-semibold">
                                    {title}
                                  </div>
                                  <p className="">
                                    <span className="font-semibold">
                                      Status:&nbsp;
                                    </span>
                                    {careSessionStatus}
                                  </p>
                                  <p className="">
                                    <span className="font-semibold">
                                      Name:&nbsp;
                                    </span>
                                    {name}
                                  </p>
                                  <p className="">
                                    <span className="font-semibold">
                                      Address:&nbsp;
                                    </span>
                                    {address}
                                  </p>
                                  <p className="">
                                    <span className="font-semibold">
                                      Overview:&nbsp;
                                    </span>
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
                                    onClick={() =>
                                      router.push(`/careSession/${data.slug}`)
                                    }
                                    className="ml-3 border border-solid  cursor-pointer md:hidden border-blue7 
                                    bg-blue9 px-3 text-olive12 hover:border-blue8
                                     hover:bg-blue10 dark:border-darkBlue7 dark:bg-darkBlue9
                                      dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue10"
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
                    hidden max-h-85vh
                    border
                    border-blue6 bg-blue2
                    text-olive12
                    dark:border-darkBlue6 dark:bg-darkBlue2
                    dark:text-darkOlive12
                    md:col-span-1 md:block
                  "
                  >
                    {/* Right Table */}
                    {/* this className is for the right card */}
                    <div className="rounded-sm mx-2 mt-4 flex min-h-80vh min-w-max flex-col justify-between border border-blue6 bg-blue1 dark:border-darkBlue6 dark:bg-darkBlue1">
                      <div className={rightCard === 1 ? "" : "hidden"}>
                        <div className="mb-4 mr-4 ml-4 justify-center ">
                          <div className="mb-2 p-4 text-center text-2xl font-semibold">
                            {selectedSession?.data?.title || isLoading}
                          </div>
                          <div className="text-sm">
                            <p className="">
                              <span className="font-semibold">
                                Status:&nbsp;
                              </span>
                              {selectedSession?.data?.careSessionStatus ||
                                isLoading}
                            </p>
                            <p className="">
                              <span className="font-semibold">
                                Name:&nbsp;
                              </span>
                              {selectedSession?.data?.name || isLoading}
                            </p>
                            <p className="">
                              <span className="font-semibold">
                                Address:&nbsp;
                              </span>
                              {selectedSession?.data?.address || isLoading}
                            </p>
                            <p className="">
                              <span className="font-semibold">
                                Medical Notes:&nbsp;
                              </span>
                              {selectedSession?.data?.medicalNotes || isLoading}
                            </p>
                            <p className="">
                              <span className="font-semibold">
                                Overview:&nbsp;
                              </span>
                              {selectedSession?.data?.overview || isLoading}
                            </p>
                            <p className="">
                              <span className="font-semibold">
                                Hourly Rate:&nbsp;
                              </span>
                              ${selectedSession?.data?.hourlyRate || isLoading}
                            </p>
                            <p className="">
                              <span className="font-semibold">
                                Hours:&nbsp;
                              </span>
                              {selectedSession?.data?.totalHours || isLoading}
                            </p>
                            <p className="">
                              <span className="font-semibold">
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
                                className="text-base ml-3 border border-solid  cursor-pointer border-blue7 
                                bg-blue9 px-3 text-olive12 hover:border-blue8
                                 hover:bg-blue10  dark:border-darkBlue7 dark:bg-darkBlue9
                                  dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue10"
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
