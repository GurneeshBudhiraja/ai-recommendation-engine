import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import BrainIcon from "../../public/brain-icon";
import { cn } from "@/lib/utils";
import { Paperclip, X } from "lucide-react";
interface SearchBarProps {
  searchTerm: string;
  aiSearch: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setAISearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBar({
  searchTerm,
  setSearchTerm,
  aiSearch,
  setAISearch,
}: SearchBarProps) {
  return (
    <div
      className={cn("", {
        "absolute left-1/2 -translate-x-1/2 w-2/3 h-1/2 z-50  rounded-3xl border border-black bg-white drop-shadow-lg":
          aiSearch,
      })}
    >
      {aiSearch && (
        <div
          className="absolute right-5 top-5 cursor-pointer hover:bg-gray-200 p-3 rounded-full transition-colors duration-200 ease-in-out "
          onClick={() => setAISearch(!aiSearch)}
        >
          <X size={18} />
        </div>
      )}
      <div
        className={cn("mb-6 flex items-center justify-center gap-3 w-full", {
          "absolute bottom-0": aiSearch,
        })}
      >
        <div
          className={cn(
            "w-2/3 relative p-px bg-gradient-to-tr from-red-300 to-blue-400 rounded-full drop-shadow-[1px_1px_1px_#ffedd5] ",
            {
              "w-3/4": aiSearch,
            }
          )}
        >
          <Input
            type="text"
            placeholder="Search products..."
            className={cn(
              " bg-gray-50  focus-visible:ring-0 rounded-full py-5 font-medium tracking-wide w-full px-4",
              { "py-6 ": aiSearch }
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className={cn(
              "absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer inline-flex gap-2"
            )}
          >
            {/* File icon */}
            {aiSearch && (
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => selectFile(e)} // Use onChange for file selection
                  accept="image/*" // Only accept images
                />
                <label
                  htmlFor="file-upload"
                  className={cn(
                    "cursor-pointer rounded-full p-2 hover:bg-gray-400/15 transition-colors ease-in-out duration-200 inline-flex gap-2"
                  )}
                >
                  <Paperclip />
                </label>
              </div>
            )}
            {/* Ai search icon */}
            <span
              onClick={() => setAISearch(!aiSearch)}
              className={cn(
                " rounded-full p-2 hover:bg-gray-400/15 transition-colors ease-in-out duration-200 inline-flex gap-2",
                { "bg-gray-400/25  ": aiSearch }
              )}
            >
              <BrainIcon />
            </span>
          </div>
        </div>
        {!aiSearch && (
          <Button variant="outline" className="h-full">
            Search
          </Button>
        )}
      </div>
    </div>
  );
}

const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    console.log(e.target.files[0]);
  }
  return;
};

export default SearchBar;
