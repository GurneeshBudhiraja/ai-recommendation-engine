"use client";
import { Session } from "@/types/appwrite.types";
import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<Session | null>(null);

export default function ContextWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // convert this function to a hook later on
    async function getLoggedInUser() {
      try {
        const currentUserResponse = await axios.get("/api/v1/auth/current/");
        const currentUser = currentUserResponse.data;
        if (!currentUser.success) {
          setUser(null);
          return;
        }
        setUser(currentUser.data);
      } catch (error) {
        console.log("Error in contextProvider", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    getLoggedInUser();

    return () => {};
  }, []);

  const [user, setUser] = useState<Session | null>(null);

  if (loading) return null;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext(): Session | null {
  return useContext(UserContext);
}
