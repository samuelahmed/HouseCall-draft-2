import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { trpc } from "@/utils/trpc";
import "../styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        {/* Added this <Head> to force propagate favicon to all pages.
        Make sure to review for better possible solution. */}
        <Head>
          <link rel="icon" href="/faviconLarge.png" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
