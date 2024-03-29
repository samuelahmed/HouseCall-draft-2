import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../../components/layout/navLayout";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Header from "@/components/layout/header";
import LoginForm from "@/components/forms/loginForm";
import NoMessages from "@/components/layout/noMessages";
// import { channel } from "diagnostics_channel";
import { Button } from "@/components/ui/button";

const Messages: NextPage = () => {
  const { data: session } = useSession();
  const { data: userData, isLoading } =
    trpc.userAPIs.readCurrentUser.useQuery();
  const { data: readAllPusherChannels } =
    trpc.messageAPIs.readAllCurrentUserPusherChannels.useQuery({
      userId: userData?.id || "",
    });

  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  // const [currentChannel, setCurrentChannel] = useState<any>(null);

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

  const [state, setState] = useState(-1);
  const [contactName, setContactName] = useState("");

  //Do I need to hide the key here or is it ok to be public with the secret hidden?
  const subscribeToChannel = (channelName: string) => {
    const pusher = new Pusher("bcf89bc8d5be9acb07da", {
      cluster: "us3",
    });

    const channel = pusher.subscribe(selectedChannel.channelName);

    channel.bind("my-event", function (data: any) {
      setMessages((prev) => {
        return [data, ...prev];
      });
    });
  };

  // const unSubscribeToChannel = (unsubscribeChannel: any) => {

  //   const channel = pusher.unsubscribe(unsubscribeChannel.channelName);
  //   channel.unbind("my-event", function (data: any) {
  //     setMessages((prev) => {
  //       return [data, ...prev];
  //     });
  //   }
  //   );
  // };

  //  const unSubscribe = pusher.unsubscribe(channelName);

  // console.log("selectedChannel", selectedChannel)

  // pusher.unsubscribe(channelName);

  useEffect(() => {
    if (selectedChannel) {
      subscribeToChannel(selectedChannel);
    }
  }, [selectedChannel]);

  // useEffect(() => {
  //   if (unsubscribeChannel) {
  //     unSubscribeToChannel(unsubscribeChannel);
  //   }
  // }, [unsubscribeChannel]);

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
      <Header />
      <div>
        {session && (
          <div className="font-roboto">
            <div>
              <p className="py-2 px-4">
                It is considered best practice to discuss what will happen in a
                care session before meeting in person for the first time.
              </p>
            </div>
            <div className="grid min-h-screen grid-cols-5">
              <div className="col-span-1">
                <div className="py-2 text-center text-xl">Contacts</div>
                {readAllPusherChannels?.map((channel, index) => (
                  <div
                    className={
                      state === index
                        ? "mb-1 border bg-blue4 px-2 py-2 text-lg dark:bg-darkBlue4"
                        : "mb-1 border px-2 py-2 text-lg hover:bg-blue4 dark:hover:bg-darkBlue4"
                    }
                    onClick={() => {
                      setState(index);
                      // if (channel !== selectedChannel) {
                      //   setUnsubscribeChannel(selectedChannel);
                      // }

                      if (
                        channel.channelName !== selectedChannel?.channelName
                      ) {
                        setSelectedChannel(channel);
                        // setCurrentChannel(channel);
                      }
                      setContactName(
                        channel.caregiverName || channel.patientName || ""
                      );
                    }}
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
              </div>

              <div className="col-span-4">
                <div className="py-2 text-center text-xl">{contactName}</div>
                <div className="mx-2 max-h-60vh min-h-60vh overflow-scroll">
                  {messages.length === 0 &&
                    readAllPusherChannels?.length === 0 && (
                      <div>
                        {userData?.role === "Patient" && (
                          <div className="flex flex-col items-center justify-center ">
                            <NoMessages />
                            When caregivers apply to your sessions you will be
                            able to add them to your contact list and message
                            them.
                          </div>
                        )}
                        {userData?.role === "Caregiver" && (
                          <div>
                            <NoMessages />
                            Apply to a session and interested patients will be
                            able to add you to their contact list and message
                            you.
                          </div>
                        )}
                      </div>
                    )}
                  {messages
                    ?.sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .reverse()
                    // .slice(0, 100)
                    .map((message) => {
                      const liveFormattedDatetime = new Date(
                        message.createdAt
                      ).toLocaleString();

                      return (
                        <>
                          {message.senderName === userData?.username && (
                            <div className="grid">
                              <div
                                className="mb-1 flex min-w-40vw max-w-40vw flex-row border border-gray4 bg-gray3 dark:border-darkGray4 dark:bg-darkGray3"
                                key={message.id}
                              >
                                <div className="w-16 border border-gray4 text-xs dark:border-darkGray4">
                                  <p>{liveFormattedDatetime}</p>
                                </div>

                                {/* wtf do I have two of these? */}
                                <p className="">{message.message}</p>
                                {!message.message && (
                                  <p className="">{message.content}</p>
                                )}
                              </div>
                            </div>
                          )}
                          {message.senderName !== userData?.username && (
                            // TODO: GET THESE ON THE SAME LINE WHILE KEEPING THE JUSTIFY SELF END FOR THE DATETIME
                            <div className="grid">
                              <div
                                className="grid  min-w-40vw max-w-40vw justify-self-end border border-blue3 bg-blue3 dark:border-darkBlue4 dark:bg-darkBlue3"
                                key={message.id}
                              >
                                <p className="justify-self-start ">
                                  {message.message}
                                </p>

                                {!message.message && (
                                  <p className="justify-self-start ">
                                    {message.content}
                                  </p>
                                )}
                                <div className="w-16 justify-self-end border border-blue4 text-xs dark:border-darkBlue4">
                                  <p>{liveFormattedDatetime}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
                <div className="mt- mr-2 ml-2">
                  <textarea
                    className="inline-block h-12 w-full border px-1 py-1 align-text-top focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                <div className="mr-2 ml-2 flex justify-end">
                  <div className="my-4 flex justify-center">
                    <Button variant="default" size="default" 
                        onClick={() => {
                          publish();
                        }}                    
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!session && (
          <>
            <LoginForm />
          </>
        )}
      </div>
    </>
  );
};

export default Messages;
