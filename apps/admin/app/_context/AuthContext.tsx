import React, { createContext, useContext, useEffect, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type UserType = {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
};

type ProfileType = {
  email: string;
  // Add other profile fields as needed
};

type AuthContextType = {
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const logOut = () => {
    Cookies.remove("auth-token");
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ logOut }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
