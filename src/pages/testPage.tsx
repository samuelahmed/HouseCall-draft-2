import { type NextPage } from "next";
import Head from "next/head";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { useSession } from "next-auth/react";

const TestPage: NextPage = () => {
  // TODO: Need to push the data to current user in db

  const router = useRouter();
  // const { data: session } = useSession();
  const { data: userData, isLoading } =
    trpc.userAPIs.readCurrentUser.useQuery();

  //flag to check if publish is called
  const [publishTriggered, setPublishTriggered] = useState(false);

  //Create stripe account (restricted atm) with mutation
  const [linkInputs, setLinkInputs] = useState({
    account: "",
    refresh_url: "https://example.com/reauth",
    return_url: "http://localhost:3000/testPage",
    type: "account_onboarding",
  });

  //create stripe account
  const { mutate } = trpc.stripeAPIs.createExpressAccount.useMutation({
    onSuccess: (accData: { id: string }) => {
      setLinkInputs((prevInputs) => ({
        ...prevInputs,
        account: accData.id,
      }));
      // push the data to current user in db
      updateUser({
        stripeUserId: accData.id,
      });

      setPublishTriggered(true); // Set the flag
    },
  });

  //publish on  click of the button
  const triggerCreateStripeAccount = () => {
    mutate(inputs);
  };

  //set the type of stripe account
  const [inputs, setInputs] = useState({
    type: "express",
  });

  //Link stripe account with mutation
  const { mutate: link } = trpc.stripeAPIs.accountLink.useMutation({
    onSuccess: (data) => {
      console.log(data);
      router.push(data.url);
    },
  });

  // link the acc
  const linkAccount = () => {
    link(linkInputs);
  };

  //make sure linkAccount is called after publish is called
  useEffect(() => {
    if (publishTriggered) {
      linkAccount();
      setPublishTriggered(false);
    }
  }, [publishTriggered]);

  //update user
  const { mutate: updateUser } = trpc.userAPIs.updateUserStripeId.useMutation();

  //USER LOGGING INTO STRIPE CONNECT ACCOUNT TO SEE THEIR BALANCE, ETC
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

  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <Header />

      {}
      <div className="py-10 px-10">
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
          2) If yes, then show button to login to stripe account
        */}
        {userData?.stripeUserId !== null && (
          <Button
            variant="default"
            size="default"
            onClick={() => {
              triggerUserLogin();
            }}
          >
            Login to your stripe account
          </Button>
        )}
      </div>
    </>
  );
};

export default TestPage;
