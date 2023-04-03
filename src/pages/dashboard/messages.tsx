import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../../components/layout/navLayout";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import * as Label from "@radix-ui/react-label";
import Header from "@/components/layout/header";

const Messages: NextPage = () => {
  // TODO: Make sure there are no duplicate connections from same user
  // TODO: review readCurrentUser API to make sure it's not returning sensitive data

  const { data: session } = useSession();
  const { data: userData, isLoading } =
    trpc.userAPIs.readCurrentUser.useQuery();
  const { data: readAllPusherChannels } =
    trpc.messageAPIs.readAllCurrentUserPusherChannels.useQuery({
      userId: userData?.id || "",
    });

  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  const { data: readMessages } =
    trpc.messageAPIs.readMessagesByChannel.useQuery({
      channelName: selectedChannel?.channelName || "",
    });

  const [messages, setMessages] = useState<any[]>([]);
  
  const [inputs, setInputs] = useState({
    senderId: userData?.username || "",
    message: "",
    senderName: userData?.username || "",
    channelName: selectedChannel?.channelName || "",
  });

  const subscribeToChannel = (channelName: string) => {
    const pusher = new Pusher("c13caf6d2e7e0e3addce", {
      cluster: "us3",
    });
    const channel = pusher.subscribe(selectedChannel.channelName);
    channel.bind("my-event", function (data: any) {
      setMessages((prev) => {
        return [data, ...prev];
      });
    });
  };

  useEffect(() => {
    if (selectedChannel) {
      subscribeToChannel(selectedChannel.channelName);
    }
  }, [selectedChannel]);

  useEffect(() => {
    if (readMessages) {
      setMessages(readMessages);
    }
  }, [readMessages]);

  const { mutate } = trpc.messageAPIs.createMessage.useMutation({
    onSuccess() {
      setInputs((prev) => ({
        ...prev,
        message: "",
      }));
    },
  });

  const publish = () => {
    mutate(inputs);
  };

  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      < Header />
      {/* <NavLayout /> */}
      <div>
        {session && (
          <>
            <main className="grid grid-cols-1 bg-blue1 dark:bg-darkBlue1 md:grid-cols-6">
              <div className="col-span-5 min-w-fit bg-blue1 dark:bg-darkBlue1">
                <div className="mx-4 mt-4 mb-1 flex items-center text-olive12 dark:text-darkOlive12">
                  {/* <SearchEngine /> */}
                </div>
                <div className="mx-4 grid min-h-88vh grid-cols-2 gap-x-1 bg-blue1 dark:bg-darkBlue1">
                  {/* DYNAMIC PART OF DASHBOARD */}
                  <div>
                    {readAllPusherChannels?.map((channel) => (
                      <div
                        className="mb-1 bg-yellow9"
                        onClick={() => setSelectedChannel(channel)}
                        key={channel.channelName}
                      >
                        {userData?.role === "Patient" && (
                          <div>{channel.caregiverName}</div>
                        )}
                        {userData?.role === "Caregiver" && (
                          <div>{channel.patientName}</div>
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
                        id="Message"
                        value={inputs.message}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            message: e.target.value,
                            sender: userData?.username || "",
                            senderId: userData?.id || "",
                            senderName: userData?.username || "",
                            channelName: selectedChannel?.channelName || "",
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
                          const liveFormattedDatetime = new Date(
                            message.createdAt
                          ).toLocaleString();
                          return (
                            <>
                              {message.senderName === userData?.username && (
                                <div
                                  className="min-w-40vw border bg-yellow9"
                                  key={message.id}
                                >
                                  <p className="text-blue10">
                                    {message.senderName}
                                  </p>
                                  <p>{liveFormattedDatetime}</p>
                                  <p className="font-bold">{message.message}</p>

                                  {!message.message && (
                                    <p className="font-bold">
                                      {message.content}
                                    </p>
                                  )}
                                </div>
                              )}
                              {message.senderName !== userData?.username && (
                                <div
                                  className="min-w-40vw border text-right "
                                  key={message.id}
                                >
                                  <p className="text-blue10">
                                    {message.senderName}
                                  </p>
                                  <p>{liveFormattedDatetime}</p>
                                  <p className="font-bold">{message.message}</p>

                                  {!message.message && (
                                    <p className="font-bold">
                                      {message.content}
                                    </p>
                                  )}
                                </div>
                              )}
                            </>
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
