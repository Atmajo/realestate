"use client";

import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/app/_context/AuthContext";
import Cookies from "js-cookie";

const Authlayout = ({ children }: AuthLayoutProps) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <main className="flex flex-col justify-center items-center">
          {children}
        </main>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default Authlayout;
