import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { inter } from "@/app/fonts";
import { Auth } from "@/services/auth";

export function DemoHeader({
  inputRef,
  searchButtonClick,
  aiSearchButtonClick,
}) {
  const [isLogin, setIsLogin] = useState<boolean | null>(false); // TODO: change this to false
  const [isLoading, setIsLoading] = useState<boolean | null>(false); // TODO: change this to true
  const [isPending, setIsPending] = useState<boolean>(false);

  const checkLoginStatus = async () => {
    setIsLoading(true);
    try {
      const auth = new Auth();
      const isUserLoggedIn = await auth.getAccount();
      console.log("isUserLoggedIn: ", isUserLoggedIn);
      if (isUserLoggedIn.status) setIsLogin(true);
    } catch (error) {
      if (error instanceof Error)
        console.log("Error in demo-header.tsx: ", error.message);
      setIsLogin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setIsPending(true);
      // TODO: remove this after debugging
      console.log("loggin out");
      const auth = new Auth();
      await auth.deleteSession();
      setIsLogin(false);
    } catch (error) {
      console.log("Error while logging out: ", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    // checkLoginStatus();
  }, [isLogin]);

  return (
    <div
      className={`${inter.className} h-fit flex gap-7 justify-center items-center flex-wrap mx-14 `}
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
      <div
        className={`${
          !isLoading ? "opacity-100" : "opacity-0"
        } transition-all duration-200 ease-in-out`}
      >
        {isLogin ? (
          <Button
            variant="outline"
            className={`inline-flex items-center space-x-2 text-base text-white border-[#27272a] hover:bg-white/10 active:bg-white/15 h-12 select-none transition-all duration-150 ease-in-out`}
            disabled={isPending}
            onClick={logOut}
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>

            <span>Logout</span>
          </Button>
        ) : (
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
        )}
      </div>
    </div>
  );
}
