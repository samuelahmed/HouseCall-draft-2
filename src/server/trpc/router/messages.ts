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
  //create a pusherChannel entry in db for the caregiver / patient
  createPusherChannel: privateProcedure
    .input(
      z.object({
        patientId: z.string(),
        caregiverId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const { patientId, caregiverId } = input;

      const newPusherChannel = ctx.prisma.pusherChannel.create({
        data: {
          channelName: `${patientId}-${caregiverId}`,
          patientId: patientId,
          caregiverId: caregiverId,
        },
      });

      return newPusherChannel;
    }),



    readAllCurrentUserPusherChannels: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      const { userId } = input;
  
      const currentUserPusherChannels = ctx.prisma.pusherChannel.findMany({
        where: {
          OR: [
            { patientId: userId },
            { caregiverId: userId }
          ]
        },
      });
  
      return currentUserPusherChannels;
    }),








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
      //add receiverId & senderName & receiverName
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
      });

      return newMessage;
    }),
});
