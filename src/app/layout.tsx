import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="sm:flex h-screen text-white">
        <main className="grow bg-custom-gradient2 text-white">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
