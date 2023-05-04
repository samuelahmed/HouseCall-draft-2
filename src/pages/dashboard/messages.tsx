import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../../components/layout/navLayout";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Header from "@/components/layout/header";
import LoginForm from "@/components/forms/loginForm";
import { env } from "../../env/client.mjs";
import { clientEnv } from "env/schema.mjs";


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

  const [state, setState] = useState(-1);
  const [contactName, setContactName] = useState("");

  //Do I need to hide the key here or is it ok to be public with the secret hidden?
  const subscribeToChannel = (channelName: string) => {
    const pusher = new Pusher("bcf89bc8d5be9acb07da" , {
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
                      if (!selectedChannel) {
                        setSelectedChannel(channel);
                        setContactName(
                          channel.caregiverName || channel.patientName || ""
                        );
                      }
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
                    <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue7">
                      <button
                        type="button"
                        onClick={() => {
                          publish();
                        }}
                        className="cursor-pointer bg-blue10 px-5 py-1 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue7"
                      >
                        Send
                      </button>
                    </div>
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
