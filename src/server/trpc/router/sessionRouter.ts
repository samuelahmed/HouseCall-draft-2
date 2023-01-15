import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const sessionRouter = router({
  createOneSession: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;
      const item = await ctx.prisma.shoppingItem.create({
        data: {
          name,
        },
      });

      return item;
    }),

  getAllSessions: publicProcedure.query(({ ctx }) => {
    const items = ctx.prisma.shoppingItem.findMany();
    return items;
  }),
});
