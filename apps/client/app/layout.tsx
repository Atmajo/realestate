import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: ["400", "600", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Realestate",
  description: "Made by iTraction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "antialiased")}>{children}</body>
    </html>
  );
}
