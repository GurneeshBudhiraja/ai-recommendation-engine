import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  onSearch: (term: string) => void;
  onCreateNew: () => void;
  countAPI: number;
}

export function DashboardLayout({
  children,
  onSearch,
  onCreateNew,
  countAPI,
}: DashboardLayoutProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border bg-card w-screen">
        <div className="container mx-auto p-2  md:p-4  flex justify-between items-center">
          <Button onClick={() => router.push("/")}>
            <Home size={18} />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search API keys"
                className="pl-10 w-64 bg-background"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <Button onClick={onCreateNew} disabled={countAPI === 3}>
              <Plus className="md:mr-2" size={18} />
              <span className="sr-only md:not-sr-only">Create New Key</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
