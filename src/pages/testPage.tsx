import { type NextPage } from "next";
import Head from "next/head";
// import NavLayout from "../components/layout/navLayout";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/forms/loginForm";

import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useState } from "react";



const TestPage: NextPage = () => {


  //Create stripe account (restricted atm) with mutation
  const { mutate } = trpc.stripeAPIs.createExpressAccount.useMutation({
  });
  const publish =  () => {
    mutate(inputs);
  };
  const [inputs, setInputs] = useState({
    type: "express",
  });


  

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />

      {/* BUTTONS sm, default, lg */}
      <div className="py-10 px-10">
        <Button variant="default" size="sm"

        onClick={publish}
        >
          Smol button
        </Button>
        <div className="py-10"></div>

        <Button variant="redButton" size="sm">
          Smol button
        </Button>
        <div className="py-10"></div>

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
        </Button>

        <div className="py-10"></div>
      </div>
    </>
  );
};

export default TestPage;
