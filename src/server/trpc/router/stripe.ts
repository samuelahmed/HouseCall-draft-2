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


    createLoginLink: privateProcedure
    .input(
      z.object({
        stripeAccountId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { stripeAccountId } = input;
      const loginLink = await stripe.accounts.createLoginLink(
        stripeAccountId
      );
      return loginLink;
    }
    ),
    


  //create a payment intent
  createPaymentIntent: privateProcedure
    
    .input(
      z.object({
        line_items: z.array(z.object({
          price: z.string(),
          quantity: z.number(),
        })),
        payment_intent_data: z.object({
          //this take a set amount (how to make it a dynamic percentage)
          application_fee_amount: z.number(),
          transfer_data: z.object({
            destination: z.string(),
          }),
        }),
        success_url: z.string(),
        cancel_url: z.string(),

      })
    )
    .mutation(async ({ input }) => {
      const { line_items, payment_intent_data, success_url, cancel_url } = input;
      const paymentIntent = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: line_items,
        payment_intent_data: payment_intent_data,
        success_url: success_url,
        cancel_url: cancel_url,
      });
      return paymentIntent;
    }),




    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   line_items: [
    //     {
    //       price: '{{PRICE_ID}}',
    //       quantity: 1,
    //     },
    //   ],
    //   payment_intent_data: {
    //     application_fee_amount: 123,
    //     transfer_data: {
    //       destination: '{{CONNECTED_ACCOUNT_ID}}',
    //     },
    //   },
    //   success_url: 'https://example.com/success',
    //   cancel_url: 'https://example.com/cancel',
    // });


});
