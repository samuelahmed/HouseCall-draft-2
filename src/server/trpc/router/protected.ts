import { router, publicProcedure, privateProcedure } from "../trpc";

//make sure this is working as intended
export const protectedRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: privateProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
