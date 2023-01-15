import { router } from "../trpc";
import { protectedRouter } from "./protected";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { updateAccountRouter } from "./updateAccount";
import { itemRouter } from "./itemRouter";

export const appRouter = router({
  example: exampleRouter,
  protected: protectedRouter,
  auth: authRouter,
  updateAccount: updateAccountRouter,
  newItemRoute: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
