import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen dark:bg-slate-800 bg-[hsl(0,0%,96%)]">
      {/* Managing high-level responsiveness */}
      <main className="w-12/12 mx-auto flex flex-col p-2 md:w-12/12 lg:w-11/12 xl:w-11/12">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
