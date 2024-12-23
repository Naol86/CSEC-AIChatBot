import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "Naol AI",
    template: "%s | Naol AI",
  },
  description:
    "Naol AI is an interactive web app designed to engage users in meaningful and dynamic conversations. Powered by advanced AI, it offers insightful responses to chat prompts, making it ideal for learning, brainstorming, problem-solving, and casual dialogue.",
  keywords: [
    "Naol Kasinet",
    "Naol AI",
    "interactive web app",
    "AI chatbot",
    "dynamic conversations",
    "machine learning",
    "AI-powered assistant",
    "brainstorming tool",
    "problem-solving",
    "learning platform",
    "AI for education",
    "casual dialogue AI",
    "intelligent assistant",
  ],
  authors: [{ name: "Naol Kasinet" }],
  openGraph: {
    title: "Naol AI",
    description:
      "Discover Naol AI, an intelligent assistant designed for meaningful conversations, brainstorming, and learning.",
    url: "https://ai.naol.me",
    siteName: "Naol AI",
    images: [
      {
        url: "https://ai.naol.me/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Naol AI Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naol AI",
    description:
      "Naol AI: Your AI-powered assistant for meaningful conversations, brainstorming, and education.",
    creator: "@naolai",
    images: ["https://ai.naol.me/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
