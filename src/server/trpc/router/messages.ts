import { router, publicProcedure, privateProcedure } from "../trpc";
import { z } from "zod";
import Pusher from "pusher";
import { env } from "../../../env/server.mjs";

const pusher = new Pusher({
  appId: env.APP_ID,
  key: env.APP_KEY,
  secret: env.APP_SECRET,
  cluster: env.APP_CLUSTER,
  useTLS: true,
});

export const messageRouter = router({
  createPusherChannel: privateProcedure
    .input(
      z.object({
        patientId: z.string(),
        caregiverId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingChannel = await ctx.prisma.pusherChannel.findFirst({
        where: {
          channelName: `${input.patientId}-${input.caregiverId}`,
        },
      });
      if (existingChannel) {
        throw new Error("Channel already exists");
      }

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

  createMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
        senderId: z.string(),
        channelName: z.string(),
        senderName: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const { message, senderId, channelName, senderName } = input;
      const newMessage = ctx.prisma.message.create({
        data: {
          content: message,
          senderId: senderId,
          channelName: channelName,
          createdAt: new Date(),
        },
      });
      pusher.trigger(channelName, "my-event", {
        message: message,
        senderId: senderId,
        channelName: channelName,
        createdAt: new Date(),
        senderName: senderName,
      });
      return newMessage;
    }),

  readAllCurrentUserPusherChannels: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { userId } = input;

      const currentUserPusherChannels = ctx.prisma.pusherChannel.findMany({
        where: {
          OR: [{ patientId: userId }, { caregiverId: userId }],
        },
      });
      const channelsWithNames = await Promise.all(
        (
          await currentUserPusherChannels
        ).map(
          async (channel: {
            channelName: string;
            caregiverId: string;
            patientId: string;
          }) => {
            const caregiver = await ctx.prisma.user.findUnique({
              where: {
                id: channel.caregiverId,
              },
            });
            const patient = await ctx.prisma.user.findUnique({
              where: {
                id: channel.patientId,
              },
            });
            return {
              ...channel,
              caregiverName: caregiver?.username,
              patientName: patient?.username,
              channelName: channel.channelName,
            };
          }
        )
      );
      return channelsWithNames;
    }),

  readMessagesByChannel: publicProcedure
    .input(
      z.object({
        channelName: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { channelName } = input;
      const messages = await ctx.prisma.message.findMany({
        where: {
          channelName: channelName,
        },
      });
      const messagesWithSenderNames = await Promise.all(
        messages.map(async (message) => {
          const sender = await ctx.prisma.user.findUnique({
            where: {
              id: message.senderId,
            },
          });
          return {
            ...message,
            senderName: sender?.username,
          };
        })
      );
      return messagesWithSenderNames;
    }),

    
});
