import Navbar from "@/components/navigation/navbar";

import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
