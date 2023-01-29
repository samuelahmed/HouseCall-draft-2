import { router } from "../trpc";
import { protectedRouter } from "./protected";
import { authRouter } from "./auth";
import { sessionRouter } from "./sessionRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  protected: protectedRouter,
  auth: authRouter,
  sessionAPIs: sessionRouter,
  userAPIs: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
