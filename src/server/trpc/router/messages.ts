import { router, publicProcedure, privateProcedure } from "../trpc";
import { z } from "zod";
import Pusher from "pusher";

//Create a pusher instance
//Move this to env variables before deployment
const pusher = new Pusher({
  appId: "1571069",
  key: "c13caf6d2e7e0e3addce",
  secret: "a157128c244e8950e7d3",
  cluster: "us3",
  useTLS: true,
});

export const messageRouter = router({
  //this is getting all the messages from the database
  //this is being used to populate the history of messages on page load
  //this will need to be limited to current user and the user they are chatting with
  //will I need to limit total message load (or is the limit on front end enough)
  readMessages: publicProcedure.query(({ ctx }) => {
    const messages = ctx.prisma.message.findMany({});
    return messages;
  }),

  //this is creating a new message in the database & sending it to the pusher channel
  createMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
        senderId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      //need to add second userId to the input so that we can create a message to the correct pusher channel
      const { message, senderId } = input;

      //this is creating a new message in the database
      //this is being used to populate the history of messages on page load
      const newMessage = ctx.prisma.message.create({
        data: {
          content: message,
          senderId: senderId,
          createdAt: new Date(),
        },
      });

      //this is sending data to the pusher channel
      //the channel is active as long as someone is subscribed to it
      //subscription occured on the front end
      pusher.trigger("my-channel", "my-event", {
        message: message,
        senderId: senderId,
        createdAt: new Date(),
        // sender: user,
      });

      return newMessage;
    }),
});
