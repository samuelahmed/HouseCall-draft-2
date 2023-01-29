import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./userRouter";
import { careSessionRouter } from "./careSessionRouter";

export const appRouter = router({
  auth: authRouter,
  sessionAPIs: careSessionRouter,
  userAPIs: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
