import React from "react";

export function ProductCategory({
  name,
  className,
  isActive,
}: {
  name: string;
  className: string;
  isActive?: boolean;
}) {
  return (
    <div
      className={`mb-3 bg-[#18181a] py-8 px-7 hover:cursor-pointer rounded-xl duration-200 ease-in-out h-full w-full  ${
        isActive
          ? "bg-neutral-950 border-2 border-zinc-300 drop-shadow-2xl  shadow-white ml-1"
          : "hover:bg-[#1d1d1d]"
      }  ${className} `}
    >
      {name}
    </div>
  );
}
