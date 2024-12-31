import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import { cn } from "@/lib/utils";
import ContextWrapper from "./context/contextProvider";

export const metadata: Metadata = {
  title: "AI Recommendations",
  description: "AI Recommendations Search Engine",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("light antialiased box-border", inter.className)}>
        <ContextWrapper>{children}</ContextWrapper>
      </body>
    </html>
  );
}
