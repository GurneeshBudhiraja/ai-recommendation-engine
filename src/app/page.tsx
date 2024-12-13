"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Home = () => {
  return (
    <div>
      <Link href={"/demo"}>
        <Button>Demo Page</Button>
      </Link>{" "}
      {/* DEBUG: remove this after testing  */}
      <Button
        onClick={() => {
          console.log(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
        }}
      >
        ENV variable testing
      </Button>
    </div>
  );
};

export default Home;
