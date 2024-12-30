import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import { cn } from "@/lib/utils";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export const metadata: Metadata = {
  title: "AI Recommendations",
  description: "AI Recommendations Search Engine",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDB();
  return (
    <html lang="en">
      <body className={cn("dark antialiased box-border", inter.className)}>
        {children}
      </body>
    </html>
  );
}
