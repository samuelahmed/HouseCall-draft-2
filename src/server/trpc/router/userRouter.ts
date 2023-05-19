import { router, publicProcedure, privateProcedure } from "../trpc";
import { z } from "zod";

//This router is for the following schemas:
  //User

export const userRouter = router({
  // ***************************
  // *       CREATE            *
  // * User created in auth.ts *
  // ***************************

  // ************************
  // *        READ          *
  // ************************

  readCurrentUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
    });
  }),

  // ************************
  // *       UPDATE         *
  // ************************

  updateCurrentUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
        address: z.string(),
        city: z.string(),
        postalCode: z.string(),
        role: z.string(),
        stripeUserId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, email, city, postalCode, password, address, role, stripeUserId } = input;
      const updatedUser = await ctx.prisma.user.upsert({
        create: {
          username,
          email,
          password,
          address,
          city,
          postalCode,
          role,
          stripeUserId,
        },
        update: {
          username,
          email,
          password,
          address,
          city,
          postalCode,
          role,
          stripeUserId,
        },
        where: {
          id: ctx.session?.user?.id,
        },
      });
      return updatedUser;
    }),

    //update user stripe id only 
    updateUserStripeId: privateProcedure
    .input(
      z.object({
        stripeUserId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { stripeUserId } = input;
      const updatedUser = await ctx.prisma.user.update({
        data: {
          stripeUserId,
        },
        where: {
          id: ctx.session?.user?.id,
        },
      });
      return updatedUser;
    }),


  // ************************
  // *       DELETE         *
  // ************************
});


