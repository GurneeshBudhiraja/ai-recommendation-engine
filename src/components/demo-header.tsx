import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { inter } from "@/app/fonts";

export function DemoHeader({
  inputRef,
  searchButtonClick,
  aiSearchButtonClick,
}) {
  return (
    <div
      className={`${inter.className} h-fit flex w-full gap-7 items-center flex-wrap`}
    >
      {/* TODO: Company name would come here */}
      <div className="bg-[#27272a] w-fit p-4 text-white rounded-md">
        Coming soon!
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-center grow h-full relative">
        {/* Input Field */}
        <div className="relative w-full max-w-3xl ">
          <Input
            className="p-6 md:text-base w-full rounded-r-none transition-all duration-200 ease-in-out pl-12 bg-[#1e1e1f] text-white border border-[#27272a]"
            placeholder="Search items..."
            ref={inputRef}
          />
          {/* BrainCircuit Icon */}
          <span
            className="absolute focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white right-4 top-1/2 transform -translate-y-1/2 hover:cursor-pointer hover:bg-white/5 p-3 transition-all duration-200 ease-in-out rounded-full active:bg-white/10"
            tabIndex={0}
            onClick={aiSearchButtonClick}
          >
            <BrainCircuit size={24} color="#ffffff" />
          </span>
        </div>

        {/* Search Button */}
        <div
          className="px-6 py-[0.62rem] hover:bg-white/10 hover:cursor-pointer transition-all duration-150 ease-in-out rounded-r-md border border-[#27272a] active:bg-white/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          onClick={searchButtonClick}
          tabIndex={0}
        >
          <Search
            size={28}
            color="#fff"
            strokeWidth={1.75}
            absoluteStrokeWidth
          />
        </div>
      </div>

      {/* Login Button */}
      <Link
        href={"/demo/login"}
        className="focus-visible:outline-none focus-visible:ring-1 ring-white rounded-md "
      >
        <Button
          variant="outline"
          className="px-6 py-2 text-base text-white border-[#27272a] hover:bg-white/10 active:bg-white/15 h-12 select-none transition-all duration-150 ease-in-out "
        >
          Login
        </Button>
      </Link>
    </div>
  );
}
