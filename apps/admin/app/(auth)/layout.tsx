"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/app/(auth)/_context/AuthContext";

const Authlayout = ({ children }: AuthLayoutProps) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <main className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-[#cfcece] to-[#131313]">
          {children}
        </main>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default Authlayout;
