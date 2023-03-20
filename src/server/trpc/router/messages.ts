import { router, publicProcedure, privateProcedure } from "../trpc";
import { z } from "zod";
import Pusher from "pusher";
import { UserAddIcon } from "@heroicons/react/outline";


//This router is for the following schemas:
  //User
    const pusher = new Pusher({
    appId: "1571069",
    key: "c13caf6d2e7e0e3addce",
    secret: "a157128c244e8950e7d3",
    cluster: "us3",
    useTLS: true
    });

    pusher.trigger("my-channel", "my-event", {
    message: "hello world"
    });


export const messageRouter = router({



    readMessages: publicProcedure.query(({ ctx }) => {


        const messages = ctx.prisma.message.findMany({
    
        });

        console.log(messages)

        return messages;
    }),

    createMessage: publicProcedure
    .input(
        z.object({
            message: z.string(),
            senderId: z.string(),
        })

    )
    
    
    .mutation(async ({ input, ctx }) => {
        
        const {
            message,
            senderId,
        } = input;


        const newMessage = await ctx.prisma.message.create({
            data: {
                content: message,
                senderId: senderId,
     
                },
        });
        return newMessage;
    }),

    
  // ***************************
  // *       CREATE            *
  // ***************************



  // ************************
  // *        READ          *
  // ************************




  // ************************
  // *       UPDATE         *
  // ************************


  // ************************
  // *       DELETE         *
  // ************************
});


