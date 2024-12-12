import type { Metadata } from "next";
import { inter, roboto_mono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Recommendations",
  description: "AI Recommendations Search Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark antialiased `}>{children}</body>
    </html>
  );
}
