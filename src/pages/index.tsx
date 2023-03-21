import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import NavLayout from "@/components/layout/navLayout";
import Image from "next/image";
import DateEngine from "@/components/dateSelect/dateEngine";
import { OverlayContainer } from "@react-aria/overlays";
import Pusher from "pusher-js";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import * as Label from "@radix-ui/react-label";
import ChatList from "./chatList";

const Home: NextPage = () => {
  // Enable pusher logging - don't include this in production

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const Pusher = require("pusher");
  // const [chats, setChats] = useState([]);

  type Chat = {
    username: string;
    message: string;
  };

  // console.log(pusherData)

  // console.log('testData' + testData)

  // console.log()
  // console.log(channel)

  // HOW IS THIS CONNECTING WITHOUT ANY ENV VARIABLES?
  //   PUSHER_APP_ID="1571069"
  //   PUSHER_APP_KEY="c13caf6d2e7e0e3addce"
  //   PUSHER_APP_SECRET="a157128c244e8950e7d3"

  const { data, isLoading } = trpc.userAPIs.readCurrentUser.useQuery();
  const [inputs, setInputs] = useState({
    senderId: data?.username || "",
    message: "",
  });

  const { data: readMessages, refetch } =
    trpc.messageAPIs.readMessages.useQuery();

  // console.log(readMessages)
  const [chats, setChats] = useState<Chat[]>([]);

  // const messageArray = readMessages

  // messageArray.push(readMessages)

  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("c13caf6d2e7e0e3addce", {
      cluster: "us3",
    });
    const channel = pusher.subscribe("my-channel");

    // channel.bind("chat-update", function (chatData: { username: any; message: any; }) {
    //   const {username, message} = chatData
    //   setChats((prevState) => [
    //     ...prevState,
    //     { username, message },
    //   ]);
    // });
    channel.bind(
      "my-event",
      function (dataTwo: { username: any; message: any }) {
        const { username, message } = dataTwo;
        setChats((prevState) => [...prevState, { username, message }]);
      }
    );
  }, []);

  // console.log(chats)

  // console.log(messageArray)

  // useEffect(() => {
  //   setInputs((prev) => ({
  //     ...prev,
  //     name: data?.username || "",
  //     address: data?.address || "",
  //   }));
  // }, [data?.username, data?.address]);

  // console.log(readMessages)

  const { mutate } = trpc.messageAPIs.createMessage.useMutation({
    onSuccess() {
      setInputs((prev) => ({
        ...prev,
        message: "",
      }));
      console.log("meoowoowoww");

      refetch();
    },
  });

  const publish = () => {
    mutate(inputs);
  };

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
            defaultValue={data && data?.username ? data?.username : ""}
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
              }))
            }
          />
        </div>
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
        <div></div>
        {/* {console.log(messageArray[0])} */}
        {readMessages?.map((messageArray) => {
          return (
            <div key={messageArray.id}>
              <p>{messageArray.content}</p>
            </div>
          );
        })}
        {/* // {chats.map((chat) => {
//               return (  
//               // <div key={chat.me}>

//                   // <p>{chat.username}</p>
//                   // eslint-disable-next-line react/jsx-key
//                   <p>{chat.message}</p>
//                 // </div> 
//               );
//             }
//               )} */}
        {/* {console.log(chats)} */}
        Above here
        {/* <div>
          {readMessages?.map((readMessages) => {
            return (
              <div key={readMessages.id}>
                <p>{readMessages.content}</p>
              </div>
            );
          })}
        </div> */}
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
