/* eslint-disable @next/next/no-page-custom-font */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { trpc } from "@/utils/trpc";
import "../styles/globals.css";
import { Analytics } from '@vercel/analytics/react';


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <main className="font-robotoSlab">
          <Component {...pageProps} />
          <Analytics />

        </main>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
