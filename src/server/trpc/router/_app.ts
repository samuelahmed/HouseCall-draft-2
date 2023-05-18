import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./userRouter";
import { careSessionRouter } from "./careSessionRouter";
import { messageRouter } from "./messages";
import { stripeRouter } from "./stripe";

export const appRouter = router({
  auth: authRouter,
  careSessionAPIs: careSessionRouter,
  userAPIs: userRouter,
  messageAPIs: messageRouter,
  stripeAPIs: stripeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
