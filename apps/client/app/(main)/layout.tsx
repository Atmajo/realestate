"use client";

import React from "react";
import Navbar from "@/components/shared/navbar";
import { usePathname } from "next/navigation";
import Footer from "@/components/shared/footer";

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  return (
    <main className="bg-gradient-to-br from-inherit to-blue-200">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
