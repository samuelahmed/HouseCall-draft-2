import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../../components/layout/navLayout";
import { useSession } from "next-auth/react";
import NavMenu from "@/components/layout/navMenu";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import * as Label from "@radix-ui/react-label";

const Messages: NextPage = () => {
  //Load session
  const { data: session } = useSession();

  //Load current user
  //Prob don't want to use this because it has a lot of data
  //Inlcuding the user's password
  const { data: userData, isLoading } =
    trpc.userAPIs.readCurrentUser.useQuery();

  //Read past messages
  //Currently reads all messages, in future restrict to those related to user
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
  //this is to READ LIVE MESSAGES (I THINK)
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
      setInputs((prev) => ({
        ...prev,
        message: "",
      }));
    },
  });

  //Push new message to pusher channel and state
  //Is there an issue having a new trigger and new pusher, etc. here?
  //I think this is to SEND LIVE MESSAGES
  const updatePusher = (newMessage: any) => {
    const pusher = new Pusher("c13caf6d2e7e0e3addce", {
      cluster: "us3",
    });
    //need to make this DYNAMIC USER + CONNECTED USER
    // (`channel-${userData?.id}-and-${userData?.id}`)
    // caregiver     and    patient

    const channel = pusher.subscribe("my-channel");

    channel.trigger("my-event", {
      message: newMessage.message,
      sender: newMessage.sender,
      timestamp: Date.now(),
    });
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  //trigger mutation
  const publish = () => {
    updatePusher;
    mutate(inputs);
  };

  //make a list of pusherchannel that have the userId
  //then loop through the list and display the name of the other user in the channel
  //if the user clicks on a channel - then display the messages in that channel

  //loop through the list of channels and display the name of the other user in the channel
  const { data: readAllPusherChannels } =
    trpc.messageAPIs.readAllCurrentUserPusherChannels.useQuery({
      userId: userData?.id || "",
    });

  // console.log(readAllPusherChannels);

  // use the caregiverId and patientId to get the name of the other user in the channel
  // const { data: readCaregiver } = trpc.userAPIs.readCaregiver.useQuery(

  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <NavLayout />
      <div>
        {session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <NavMenu />
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className="mx-4 mt-4 mb-1 flex items-center text-olive12 dark:text-darkOlive12">
                  {/* <SearchEngine /> */}
                </div>
                <div className="mx-4 grid min-h-88vh grid-cols-2 gap-x-1 bg-blue1 dark:bg-darkBlue1">
                  {/* DYNAMIC PART OF DASHBOARD */}
                  {/* loop through the list of channels and display the name of the other user in the channel */}
                  <div>
                    {readAllPusherChannels?.map((channel) => (
                      <div className="mb-1 bg-yellow9" key={channel.id}>
                        {userData?.role === "Patient" && (
                          <div>{channel.caregiverId}</div>
                        )}
                        {userData?.role === "Caregiver" && (
                          <div>{channel.patientId}</div>
                        )}
                      </div>
                    ))}

                    




<div className="mx-4 mb-2 flex flex-col  pt-2 pr-6 text-sm ">
          <Label.Root className="px-0.5" htmlFor="firstName">
            Create Message
          </Label.Root>
          <textarea
            className="inline-block h-32 max-w-lg border
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
          Send
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

export default Messages;
