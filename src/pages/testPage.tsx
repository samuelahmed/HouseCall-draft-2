import { type NextPage } from "next";
import Head from "next/head";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";
import { create } from "domain";
import { useEffect } from "react";

const TestPage: NextPage = () => {
  
  const router = useRouter();

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
    onSuccess: (accData) => {
      setLinkInputs((prevInputs) => ({
        ...prevInputs,
        account: accData.id,
      }));
      setPublishTriggered(true); // Set the flag
    },
  });

  //publish on  click of the button
  const publish = () => {
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
      setPublishTriggered(false); // Reset the flag
    }
  }, [publishTriggered]);

  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <Header />

      <div className="py-10 px-10">
        <Button
          variant="default"
          size="default"
          onClick={() => {
            publish();
          }}
        >
          Create Stripe Account
        </Button>
      </div>
    </>
  );
};

export default TestPage;
