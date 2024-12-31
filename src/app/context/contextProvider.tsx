"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the shape of the UserContext value
interface UserContextType {
  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// Initialize UserContext with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

export default function ContextWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const currentUserResponse = await axios.get("/api/v1/auth/current/");

        const currentUser = currentUserResponse.data;

        if (!currentUser.success) {
          setUser(undefined);
          await axios.post("/api/v1/auth/logout/");
          router.push("/login");
        }
        setUser(currentUser.data.$id);
      } catch (error) {
        console.error("Error in ContextWrapper:", error);
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    }

    getLoggedInUser();
  });

  if (loading) {
    console.log("Loading... context provider");
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
  const userContext = useContext(UserContext);
  if (userContext === undefined) {
    throw new Error("useUserContext must be used within a ContextWrapper");
  }
  return userContext;
}
