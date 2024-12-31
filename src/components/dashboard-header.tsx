import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Home, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { handleLogout } from "@/utils/auth";

interface DashboardHeaderProps {
  children: ReactNode;
  onSearch: (term: string) => void;
  onCreateNew: () => void;
  countAPI: number;
}

export function DashboardHeader({
  children,
  onSearch,
  onCreateNew,
  countAPI,
}: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              aria-label="Home"
            >
              <Home className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold hidden md:block">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search API keys"
                className="pl-10 w-64"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <Button onClick={onCreateNew} disabled={countAPI >= 3} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create New Key
              {countAPI >= 3 && (
                <Badge variant="secondary" className="ml-2">
                  Limit Reached
                </Badge>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8 inline-flex justify-center items-center">
                    <User size={18} />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem
                  onClick={async () => {
                    await handleLogout();
                    localStorage.removeItem("keys");
                    router.refresh();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
