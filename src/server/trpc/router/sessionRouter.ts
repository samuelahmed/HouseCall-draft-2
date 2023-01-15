import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const sessionRouter = router({
  createOneSession: publicProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        medicalNotes: z.string(),
        overview: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, address, medicalNotes, overview, title } = input;
      const item = await ctx.prisma.careSession.create({
        data: {
          name,
          address,
          medicalNotes,
          overview,
          title,
        },
      });

      return item;
    }),

  getAllSessions: publicProcedure.query(({ ctx }) => {
    const items = ctx.prisma.careSession.findMany();
    return items;
  }),
});
