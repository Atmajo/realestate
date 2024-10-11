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
  user: UserType | null;
  profile: ProfileType | null;
  login: () => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const user: UserType = {
        access_token: codeResponse.access_token,
        authuser: "",
        expires_in: codeResponse.expires_in,
        prompt: "",
        scope: codeResponse.scope,
        token_type: codeResponse.token_type,
      };
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(JSON.parse(window.localStorage.getItem("user")!));
      Cookies.set("auth-token", user.access_token, {
        expires: 24 * 60 * 60,
        path: "/",
      });
    },
  });

  useEffect(() => {
    if (user?.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          //   console.log(res.data);
          setProfile(res.data);
          router.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    Cookies.remove("auth-token");
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
