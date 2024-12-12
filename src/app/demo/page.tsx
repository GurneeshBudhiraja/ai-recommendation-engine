"use client";
import React, { useRef } from "react";
import { DemoHeader } from "@/components/demo-header";

function page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchButtonClick = async () => {
    console.log(inputRef.current?.value);
  };
  const aiSearchButtonClick = async () => {
    console.log("ai search button clicked");
    console.log(inputRef.current?.value);
    // TODO: will need to expand the search section
  };
  return (
    <div className="min-h-screen mx-14 mt-9 text-white flex">
      <DemoHeader
        inputRef={inputRef}
        searchButtonClick={searchButtonClick}
        aiSearchButtonClick={aiSearchButtonClick}
      />
    </div>
  );
}

export default page;
