import { router, publicProcedure } from "../trpc";
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
        role: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, email, password, address, role } = input;
      const updatedUser = await ctx.prisma.user.upsert({
        create: {
          username,
          email,
          password,
          address,
          role,
        },
        update: {
          username,
          email,
          password,
          address,
          role,
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
