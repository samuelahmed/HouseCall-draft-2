import { type NextPage } from "next";
import Layout from "../components/layout/navLayout";
import Head from "next/head";
import TabsEngine from "../components/caregiverDashboard/tabsEngine";

const Caregiver: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout />
      <div className="dark:bg-gray-800 grid justify-items-center min-h-screen">
        < TabsEngine />
      </div>
    </>
  );
};

export default Caregiver;
