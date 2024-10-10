"use client";

import React from "react";
import { useAuth } from "@/app/(auth)/_context/AuthContext";

const Page = () => {
  const { profile, login, logOut } = useAuth();
  
  return (
    <section>
      <div className="flex flex-col gap-10 w-96 h-max border rounded-xl bg-white/20 backdrop-blur-sm p-4">
        <h1 className="text-3xl text-center font-semibold text-white">
          Log In
        </h1>
        <div id="form">{profile?.email}</div>
        {!profile?.email ? (
          <button
            onClick={() => login()}
            className="p-2 border rounded-lg bg-white"
          >
            Sign In With Google 🚀
          </button>
        ) : (
          <button onClick={logOut} className="p-2 border rounded-lg bg-white">
            Log Out
          </button>
        )}
      </div>
    </section>
  );
};

export default Page;
