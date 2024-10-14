import React, { createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp, logout } from "@/redux/authSlice"; // Import your actions
import { AppDispatch, RootState } from "@/redux/store"; // For typed useSelector

type AuthContextType = {
  logOut: () => void;
  login: (credentials: SignInProps) => Promise<void>;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Logout function
  const logOut = () => {
    Cookies.remove("auth-token");
    dispatch(logout());
    router.push("/sign-in");
  };

  // Login function
  const login = async (credentials: SignInProps) => {
    try {
      await dispatch(signIn(credentials)).unwrap().then();
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ logOut, login, user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
