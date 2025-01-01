"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import imageToBase64 from "@/utils/base64conversion";

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
  const [userImageURL, setUserImageURL] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Updates the userImageURL state with the image uploaded by the user
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Updates the uploadedFile with the File object for the base64 conversion
      setUploadedFile(e.target.files[0]);

      // Updates the imageURL state to show to the users
      setUserImageURL(URL.createObjectURL(e.target.files[0]));
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
            className="absolute right-1  z-10"
            onClick={toggleAISearch}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}
      <div className="max-w-xl   h-3/4 mx-2 mt-8 rounded-md px-2 font-normal tracking-wide overflow-scroll drop-shadow-md ">
        {userImageURL && (
          <Image
            src={userImageURL}
            width={300}
            height={200}
            alt="User uploaded image"
            className="p-px bg-gradient-to-tr from-red-300 to-blue-400 rounded-lg shadow-lg"
          />
        )}
      </div>
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
              onClick={async () => {
                if (uploadedFile) {
                  const base64String = await imageToBase64(uploadedFile);
                  console.log(base64String.split(",")[1]);
                }
              }}
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
