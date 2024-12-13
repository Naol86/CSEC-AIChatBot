import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "Naol AI",
    template: "%s | Naol AI",
  },
  description:
    "Naol AI is an interactive web app designed to engage users in meaningful and dynamic conversations. Powered by advanced AI, it offers insightful responses to chat prompts, making it ideal for learning, brainstorming, and casual dialogue.",
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
