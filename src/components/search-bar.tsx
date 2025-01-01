import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import BrainIcon from "../../public/brain-icon";
import { cn } from "@/lib/utils";
interface SearchBarProps {
  searchTerm: string;
  aiSearch: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setAISearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBar({
  searchTerm,
  setSearchTerm,
  setAISearch,
  aiSearch,
}: SearchBarProps) {
  return (
    <div className={cn("mb-6 flex items-center justify-center gap-3 w-full")}>
      <div
        className={cn(
          "w-2/3 relative p-px bg-gradient-to-tr from-red-300 to-blue-400 rounded-full drop-shadow-[1px_1px_1px_#ffedd5]"
        )}
      >
        <Input
          type="text"
          placeholder="Search products..."
          className={cn(
            " bg-gray-50  focus-visible:ring-0 rounded-full py-5 font-medium tracking-wide w-full px-4"
          )}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          className={cn(
            "absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer inline-flex gap-2"
          )}
        >
          {/* Ai search icon */}
          <span
            onClick={() => {
              setSearchTerm("");
              setAISearch(!aiSearch);
            }}
            className={cn(
              " rounded-full p-2 hover:bg-gray-400/15 transition-colors ease-in-out duration-200 inline-flex gap-2",
              { "bg-gray-400/25  ": aiSearch }
            )}
          >
            <BrainIcon />
          </span>
        </div>
      </div>
      <Button variant="outline" className="h-full">
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
