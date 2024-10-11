"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Authlayout = ({ children }: AuthLayoutProps) => {
  return (
    <Provider store={store}>
      <main className="flex flex-col justify-center items-center">
        {children}
      </main>
    </Provider>
  );
};

export default Authlayout;
