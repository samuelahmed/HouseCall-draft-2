/* eslint-disable @next/next/no-page-custom-font */
//TODO: review font import for a better solution - rn next/font is not working
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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Roboto:ital@0;1&display=swap"
            rel="stylesheet"
          />
        </Head>
        <main className="font-robotoSlab">
          {/* pass robotoSlab as main font - however for detailed text break it down to roboto only */}
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
