import { router } from "../trpc";
import { protectedRouter } from "./protected";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
// import { updateAccountRouter } from "./updateAccountDELETE";
import { sessionRouter } from "./sessionRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  example: exampleRouter,
  protected: protectedRouter,
  auth: authRouter,
  // updateAccount: updateAccountRouter,
  sessionAPIs: sessionRouter,
  userAPIs: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
