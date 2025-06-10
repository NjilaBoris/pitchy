import Navbar from "@/components/navigation/navbar";

import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <section className="min-h-screen">{children}</section>
    </main>
  );
};

export default RootLayout;
