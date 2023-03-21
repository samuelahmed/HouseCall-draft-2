import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import NavLayout from "@/components/layout/navLayout";
import Image from "next/image";
import Pusher from "pusher-js";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import * as Label from "@radix-ui/react-label";

const Home: NextPage = () => {
  //Load current user and past messages
  const { data: userData, isLoading } =
    trpc.userAPIs.readCurrentUser.useQuery();
  const { data: readMessages } = trpc.messageAPIs.readMessages.useQuery();

  //Set state for messages and inputs
  const [messages, setMessages] = useState<any[]>([]);
  const [inputs, setInputs] = useState({
    senderId: userData?.username || "",
    message: "",
  });

  //Add past messages to state on load
  useEffect(() => {
    if (readMessages) {
      setMessages(readMessages);
    }
  }, [readMessages]);

  //Connect to pusher channel and push new messages to it and state
  useEffect(() => {
    const pusher = new Pusher("c13caf6d2e7e0e3addce", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", function (data: any) {
      setMessages((prev) => {
        return [data, ...prev];
      });
    });
  }, []);


  

  //Add message to db and clear input
  const { mutate } = trpc.messageAPIs.createMessage.useMutation({
    onSuccess() {
      setMessages((prev) => [messages, ...prev]);

      setInputs((prev) => ({
        ...prev,
        message: "",
      }));
      

    },
    
  });

  //trigger mutation
  const publish = () => {
    mutate(inputs);

  };

  // console.log(messages);

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Care in the comfort of your home" />
      </Head>
      <NavLayout />
      <main className="flex min-h-screen flex-col items-center justify-center bg-blue1 text-olive12 dark:bg-darkBlue1 dark:text-darkBlue12">
        {/* PUSHER STUFF START */}
        <h1>Pusher Test</h1>
        <p>
          Try publishing an event to channel <code>my-channel</code>
          with event name <code>my-event</code>.
        </p>
        <div className="  mx-4 mb-2 flex max-w-fit flex-col text-sm">
          <Label.Root className="px-0.5" htmlFor="firstName">
            First name
          </Label.Root>
          <input
            className="border border-blue7 bg-blue1 px-1 py-1 dark:border-darkBlue7 dark:bg-darkBlue1"
            type="text"
            id="firstName"
            defaultValue={
              userData && userData?.username ? userData?.username : ""
            }
          />
        </div>
        <div className="mx-4 mb-2 flex w-full flex-col  pt-2 pr-6 text-sm ">
          <Label.Root className="px-0.5" htmlFor="firstName">
            Create Message
          </Label.Root>
          <textarea
            className="inline-block h-32 w-full border
                    border-blue7 bg-blue1 px-1 py-1 align-text-top dark:border-darkBlue7 dark:bg-darkBlue1"
            // type="text"
            id="Message"
            value={inputs.message}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                message: e.target.value,
                sender: userData?.username || "",
                senderId: userData?.id || "",
              }))
            }
          />
        </div>
        <button
          type="button"
          onClick={() => {
            // e.preventDefault();

            publish();
          }}
          className="cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
            dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
        >
          Create
        </button>
        <div className="flex min-w-full flex-col items-center">
          {messages
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 10)
            .map((message) => {
              // console.log(message);
              // console.log(message.message);
              const liveFormattedDatetime = new Date(
                message.createdAt
              ).toLocaleString();

              return (
                <div className="min-w-40vw" key={message.id}>
                  <p>{liveFormattedDatetime}</p>
                  {/* sender changed when I completely logged out and logged into a second account. However the sender persisted after only logout and even in icognito window... */}
                  {/* <p>{message.senderId}</p> */}
                  {/* this will handle live messages through pusher channel */}
                  <p className="font-bold">{message.message}</p>

                  {/* {message.message && (
                    <p className="font-bold">{message.message}</p>
                  )} */}
                  {!message.message && (
                    <p className="font-bold">{message.content}</p>
                  )}
                  {/* this will handle past messages from db */}
                </div>
              );
            })}
        </div>
        Above here
        {/* PUSHER STUFF END */}
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-row">
            <h1 className=" text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              House <span className="text-blue9">Call</span>
            </h1>
            <Image
              className="ml-6 self-center"
              src="/faviconLarge.png"
              alt="me"
              width="64"
              height="64"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl">Care in the comfort of your home</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 border border-blue6 bg-blue3 p-4 hover:bg-blue4 dark:border-darkBlue6 dark:bg-darkBlue3 dark:hover:bg-darkBlue4"
              href="/dashboard/caregiver/discover"
            >
              <h3 className="text-center text-2xl font-bold">Caregivers</h3>
              <div className="text-lg">
                You are passionate to help those in need.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 border border-blue6 bg-blue3 p-4 hover:bg-blue4 dark:border-darkBlue6 dark:bg-darkBlue3 dark:hover:bg-darkBlue4"
              href="/dashboard/patient/create"
            >
              <h3 className="text-center text-2xl font-bold">Patients</h3>
              <div className="text-lg">
                You or someone you care about needs assistance.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
