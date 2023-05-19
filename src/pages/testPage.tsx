import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";

import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TestPage: NextPage = () => {
  const router = useRouter();
  //Create stripe account (restricted atm) with mutation
  //ADD: On submit add the expressID to DB
  const { mutate } = trpc.stripeAPIs.createExpressAccount.useMutation({});
  const publish = () => {
    mutate(inputs);
  };
  const [inputs, setInputs] = useState({
    type: "express",
  });









  const { mutate: link } = trpc.stripeAPIs.accountLink.useMutation({
    onSuccess: (data) => {
      console.log(data);
      router.push(data.url);
    }
  })


  const linkAccount = () => {
    link(linkInputs);
  };


  const [linkInputs, setLinkInputs] = useState({
    account: "acct_1N9E03QPvpijwJG1",
    refresh_url: "https://example.com/reauth",
    return_url: "http://localhost:3000/testPage",
    type: "account_onboarding",
  });







  





  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />

      {/* BUTTONS sm, default, lg */}
      <div className="py-10 px-10">
        <Button variant="default" size="sm" onClick={publish}>
          CREATE ACC
        </Button>
        <div className="py-10"></div>

        <Button
          variant="redButton"
          size="sm"
          onClick={() => {
            linkAccount();
            // linkAccountMeow()
          }}
        >
          LINK ACC
        </Button>

        {/* <div className="py-10"></div> */}

        {/* <div> */}
          {/* //get result url from linkAccount */}
          {/* {linkAccount.?.url} */}

        {/* </div>

        <Button variant="redButton" size="default">
          Button
        </Button>

        <div className="py-10"></div>
        <Button variant="default" size="default">
          Button
        </Button>

        <div className="py-10"></div>

        <Button variant="default" size="lg">
          Large button
        </Button>
        <div className="py-10"></div>

        <Button variant="redButton" size="lg">
          Large Red button
        </Button> */}

        {/* <div className="py-10"></div> */}
      </div>
    </>
  );
};

export default TestPage;
