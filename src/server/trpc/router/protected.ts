import { router, publicProcedure, privateProcedure } from "../trpc";

export const protectedRouter = router({
  // getSession: publicProcedure.query(({ ctx }) => {
  //   return ctx.session;
  // }),
  getSecretMessage: privateProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
