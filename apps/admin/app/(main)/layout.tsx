"use client";

import React, { useEffect } from "react";
import { AuthProvider } from "@/app/_context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import Wrapper from "@/components/shared/wrapper";

const Mainlayout = ({ children }: MainLayoutProps) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <main className="flex">
          <Navbar />
          <Sidebar />
          <Wrapper>{children}</Wrapper>
        </main>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default Mainlayout;
