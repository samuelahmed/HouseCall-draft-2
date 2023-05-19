// import stripe from 'stripe';
import { router, publicProcedure, privateProcedure } from "../trpc";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(
  "sk_test_51N8vgxKJn0hb6qazNcU8oom9LDMH4ybQnKChjvjOQm2zB6NnAy9bPsCekrGWWRcYough3aJJzNXqFyu3fEzKNpEz00jPGddTQ6"
);

export const stripeRouter = router({

  //create express account
  //this creates a new account every use
  // the account is 'restricted' and needs to be verified
  createExpressAccount: privateProcedure
    .input(
      z.object({
        type: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { type } = input;
      const account = await stripe.accounts.create({
        type: type,
      });
      return account;
    }),

  //link express account to user
  accountLink: privateProcedure
    .input(
      z.object({
        account: z.string(),
        refresh_url: z.string(),
        return_url: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { account, refresh_url, return_url, type } = input;
      const accountLink = await stripe.accountLinks.create({
        account: account,
        refresh_url: refresh_url,
        return_url: return_url,
        type: type,
      });
      return accountLink;
    }),
    
});
