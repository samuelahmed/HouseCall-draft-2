import { router } from "../trpc";
import { protectedRouter } from "./protected";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { updateAccountRouter } from "./updateAccount";

export const appRouter = router({
  example: exampleRouter,
  protected: protectedRouter,
  auth: authRouter,
  updateAccount: updateAccountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
