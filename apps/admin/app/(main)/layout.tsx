"use client";

import React, { useEffect } from "react";
import { AuthProvider } from "@/app/_context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import Wrapper from "@/components/shared/wrapper";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Mainlayout = ({ children }: MainLayoutProps) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <Provider store={store}>
          <main className="flex">
            <Navbar />
            <Sidebar />
            <Wrapper>{children}</Wrapper>
          </main>
        </Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default Mainlayout;
