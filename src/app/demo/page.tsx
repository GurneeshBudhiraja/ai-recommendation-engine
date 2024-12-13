"use client";
import React, { useRef, useState } from "react";
import { DemoHeader } from "@/components/demo-header";
import { Separator } from "@/components/ui/separator";
import { ProductCategory } from "@/components/product-category";
function page() {
  const searchButtonClick = async () => {
    console.log(inputRef.current?.value);
  };
  const aiSearchButtonClick = async () => {
    console.log("ai search button clicked");
    console.log(inputRef.current?.value);
    // TODO: will need to expand the search section
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isActive, setIsActive] = useState<number>(0);

  return (
    <div className="min-h-screen mt-9 text-white flex flex-col">
      <DemoHeader
        inputRef={inputRef}
        searchButtonClick={searchButtonClick}
        aiSearchButtonClick={aiSearchButtonClick}
      />
      <Separator className="my-4 w-full" />
      <div className="flex w-full gap-10 grow ">
        <div className="w-[19.45%] ml-3 p-2">
          {["Product type 1", "Product type 2", "Product type 3"].map(
            (item, index) => {
              return (
                <div
                  key={index}
                  className="my-4 rounded-xl p-2 "
                  onClick={() => {
                    setIsActive(index);
                  }}
                >
                  <ProductCategory
                    name={item}
                    className=""
                    isActive={isActive === index}
                  />
                </div>
              );
            }
          )}
        </div>
        <div className="w-[73%]"></div>
      </div>
    </div>
  );
}

export default page;
