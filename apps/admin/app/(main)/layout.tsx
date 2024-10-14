"use client";

import React, { useEffect } from "react";
import { AuthProvider } from "@/app/_context/AuthContext";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import Wrapper from "@/components/shared/wrapper";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Mainlayout = ({ children }: MainLayoutProps) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <main className="flex">
          <Navbar />
          <Sidebar />
          <Wrapper>{children}</Wrapper>
        </main>
      </AuthProvider>
    </Provider>
  );
};

export default Mainlayout;
