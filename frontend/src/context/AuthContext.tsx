import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import type{ User } from "../types/auth.types";

import { storage } from "../utils/storage";

interface AuthContextType {
  user: User | null;
  token: string | null;

  login: (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => void;

  logout: () => void;

  isAuthenticated: boolean;

  isLoading: boolean;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
  const storedToken = storage.getToken();
  const storedUser = storage.getUser();

  if (storedToken && storedUser) {
    setToken(storedToken);
    setUser(storedUser);
  }

  setIsLoading(false);
}, []);

  const login = (
  accessToken: string,
  refreshToken: string,
  user: User
) => {

  storage.setToken(accessToken);

  storage.setRefreshToken(refreshToken);

  storage.setUser(user);

  setToken(accessToken);

  setUser(user);
};

  const logout = () => {
    storage.clear();

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
  value={{
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
    isLoading,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context)
    throw new Error(
      "useAuth must be inside AuthProvider"
    );

  return context;
};