import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const updateAccountRouter = router({

  getOne: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
    });
  }),

  //If not proper email it will not update HOWEVER THE USER IS STILL ABLE TO HIT SUBMIT THIS SHOULD BE FIXED ON THE FRONTEND.
  updateName: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
        address: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, email, password, address } = input;
      const card = await ctx.prisma.user.upsert({
        create: {
          username,
          email,
          password,
          address,
        },
        update: {
          username,
          email,
          password,
          address,
        },
        where: {
          id: ctx.session?.user?.id,
        },
      });
      return card;
    }),
});
