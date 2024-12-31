import React from "react";
import { useUserContext } from "@/app/context/contextProvider";
import { Button } from "./ui/button";
import { handleLogout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { APIKeyDropdown } from "./api-key-dropdown";
function HomeHeaderActions() {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  return (
    <div>
      {user && (
        <div className="ml-4 flex items-center gap-3">
          <APIKeyDropdown />
          <Button
            onClick={async () => {
              console.log("Logging out...");
              setUser(undefined);
              await handleLogout();
              localStorage.removeItem("selectedAPIKey");
              localStorage.removeItem("keys");
              router.refresh();
            }}
          >
            Logout
          </Button>
        </div>
      )}
      {!user && <Button onClick={() => router.push("/login")}>Login</Button>}
    </div>
  );
}

export default HomeHeaderActions;
