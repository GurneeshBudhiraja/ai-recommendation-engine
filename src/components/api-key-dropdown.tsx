"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Key, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

type APIKey = [string];

export function APIKeyDropdown() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const router = useRouter();
  const [seletedKey, setSelectedKey] = useState<string>("");

  const handleAddAPIKey = () => {
    router.push("/dashboard");
  };

  // Fetching API keys from local storage on component mount
  useEffect(() => {
    const localStorageKeysJSON = localStorage.getItem("keys");
    const localStorageSelectedKey = localStorage.getItem("selectedAPIKey");

    if (!localStorageKeysJSON) {
      // No api keys
      setApiKeys([]);
      setSelectedKey("");
      localStorage.removeItem("selectedAPIKey");
      return;
    }
    const localStorageExistingKeys = JSON.parse(localStorageKeysJSON);
    setApiKeys([...localStorageExistingKeys]);

    // When no key has been selected by the user
    if (!localStorageSelectedKey) {
      return;
    }
    const isKeyAvailable = localStorageExistingKeys.some(
      (key: string) => key === localStorageSelectedKey
    );
    if (isKeyAvailable) {
      setSelectedKey(localStorageSelectedKey);
    }

    return () => {
      setApiKeys([]);
      setSelectedKey("");
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px]">
          {seletedKey ? (
            <>{seletedKey}</>
          ) : (
            <>
              <Key className="mr-2 h-4 w-4" />
              API Keys
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] ">
        <DropdownMenuLabel>Your API Keys</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {apiKeys.length === 0 ? (
          <DropdownMenuItem>
            <span className="text-sm text-gray-400">No API keys available</span>
          </DropdownMenuItem>
        ) : (
          apiKeys.map((key, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                console.log(key);
                localStorage.removeItem("selectedAPIKey");
                localStorage.setItem("selectedAPIKey", key.toString());
                setSelectedKey(key.toString());
              }}
            >
              <span className="text-sm ">{key}</span>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleAddAPIKey} className="cursor-pointer">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
