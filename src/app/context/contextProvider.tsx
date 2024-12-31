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

// Define the shape of the UserContext value
interface UserContextType {
  user: Session | null;
  setUser: React.Dispatch<React.SetStateAction<Session | null>>;
}

// Initialize UserContext with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

export default function ContextWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
        console.error("Error in ContextWrapper:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    getLoggedInUser();
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use UserContext
export function useUserContext() {
  return useContext(UserContext);
}
