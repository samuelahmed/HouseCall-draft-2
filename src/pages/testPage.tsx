import { type NextPage } from "next";
import Head from "next/head";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TestPage: NextPage = () => {
  const router = useRouter();
  const { data: userData, isLoading } =
    trpc.userAPIs.readCurrentUser.useQuery();

  //Create stripe account
  const { mutate } = trpc.stripeAPIs.createExpressAccount.useMutation({
    onSuccess: (accData: { id: string }) => {
      setLinkInputs((prevInputs) => ({
        ...prevInputs,
        account: accData.id,
      }));
      updateUser({
        stripeUserId: accData.id,
      });
      setPublishTriggered(true);
    },
  });

  const triggerCreateStripeAccount = () => {
    mutate(inputs);
  };

  const [inputs, setInputs] = useState({
    type: "express",
  });

  //update user
  const { mutate: updateUser } = trpc.userAPIs.updateUserStripeId.useMutation();

  //Link stripe account
  const { mutate: link } = trpc.stripeAPIs.accountLink.useMutation({
    onSuccess: (data) => {
      console.log(data);
      router.push(data.url);
    },
  });

  const [publishTriggered, setPublishTriggered] = useState(false);

  const [linkInputs, setLinkInputs] = useState({
    account: "",
    refresh_url: "https://example.com/reauth",
    return_url: "http://localhost:3000/testPage",
    type: "account_onboarding",
  });

  const linkAccount = () => {
    link(linkInputs);
  };

  useEffect(() => {
    if (publishTriggered) {
      linkAccount();
      setPublishTriggered(false);
    }
  }, [publishTriggered]);

  //Login to stripe account (for caregivers only)
  const { mutate: loginLink } = trpc.stripeAPIs.createLoginLink.useMutation({
    onSuccess: (data) => {
      console.log(data);
      router.push(data.url);
    },
  });

  const triggerUserLogin = () => {
    if (userData?.stripeUserId) {
      loginLink({ stripeAccountId: userData.stripeUserId });
    }
  };

  //Update Product Price
  const { mutate: updateProductPrice } =
    trpc.stripeAPIs.updateProductPrice.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });

  const triggerUpdateProductPrice = () => {
    updateProductPrice(updateProductPriceInputs);
  };

  const [updateProductPriceInputs, setUpdateProductPriceInputs] = useState({
    unit_amount: 2000,
    currency: "usd",
    product: "prod_NwLJA1YUagYdy9",
  });

  //Create Product
  const { mutate: createProduct } = trpc.stripeAPIs.createProduct.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const triggerCreateProduct = () => {
    createProduct(createProductInputs);
  };

  const [createProductInputs, setCreateProductInputs] = useState({
    name: "test product",
  });

  //Payment Intent
  const { mutate: paymentIntent } =
    trpc.stripeAPIs.createPaymentIntent.useMutation({
      onSuccess: (data) => {
        // console.log(data);
        router.push(data.url);
      },
    });
  const triggerPaymentIntent = () => {
    paymentIntent(paymentIntentInputs);
  };

  const [paymentIntentInputs, setPaymentIntentInputs] = useState({
    line_items: [
      {
        price: "price_1NAStBKJn0hb6qaz3QXVzQtK",
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: 1000,
      transfer_data: {
        destination: "acct_1N9b8h4IaJzIzRlU",
      },
    },
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });

  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <Header />

      {}
      <div className="space-x-5 space-y-5 py-10 px-10">
        {/*
          1) Creates a new stripe account
          2) Links account to the user
          3) Update user in db with stripe account id
          4) Hides button when completed
        */}
        {userData?.stripeUserId === null && (
          <Button
            variant="default"
            size="default"
            onClick={() => {
              triggerCreateStripeAccount();
            }}
          >
            Create Stripe Account
          </Button>
        )}

        {/*
          1) Checks if current user has a stripe account
          2) If yes, then show buttons to login (caregiver only), set product price (caregiver - hidden), create product (caregiver - hidden), and test payment (patient)
        */}
        {userData?.stripeUserId !== null && (
          <>
            <Button
              variant="default"
              size="default"
              onClick={() => {
                triggerUserLogin();
              }}
            >
              Login to your stripe account
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() => {
                triggerCreateProduct();
              }}
            >
              Create Product
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() => {
                triggerUpdateProductPrice();
              }}
            >
              Set Product Price
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() => {
                triggerPaymentIntent();
              }}
            >
              Test Payment
            </Button>
          </>
          // TODO: check if patients have a sort of spending dashboard, if not create something
        )}
      </div>
    </>
  );
};

export default TestPage;
