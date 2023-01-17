import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen dark:bg-slate-800">
      {/* Managing high-level responsiveness */}
      <main className="w-12/12 mx-auto flex flex-col p-2 md:w-10/12 md:p-4 xl:w-11/12">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
