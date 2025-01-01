"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchTerm: string;
  aiSearch: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setAISearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const AISearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  aiSearch,
  setAISearch,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
    }
  };

  const toggleAISearch = () => {
    setSearchTerm("");
    setAISearch(!aiSearch);
  };

  return (
    <div className="relative w-full ">
      {aiSearch && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={toggleAISearch}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}
      <div
        className={cn(
          "flex items-center justify-center gap-3 w-full px-2 absolute bottom-4 left-0 right-0 "
        )}
      >
        <div
          className={cn(
            "relative w-full p-px bg-gradient-to-tr from-red-300 to-blue-400 rounded-full"
          )}
        >
          <Input
            type="text"
            placeholder="Search products..."
            className={cn(
              "bg-gray-50 focus-visible:ring-0 rounded-full font-medium tracking-wide w-full py-6"
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 ">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer hover:bg-gray-200 focus-visible:outline-none"
              asChild
            >
              <label htmlFor="file-upload">
                <Paperclip className="h-4 w-4" />
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-200"
              onClick={(e) => console.log(e)}
            >
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearchBar;
