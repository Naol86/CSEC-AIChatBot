import AppSidebar from "@/components/Sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSessionProvider from "@/hooks/CustomeSessionProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "Naol AI is always happy to help! Engage in dynamic conversations, get insightful responses, and explore ideas effortlessly with our interactive web app.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <CustomSessionProvider>
          <AppSidebar />
        </CustomSessionProvider>
        <main className="grow bg-custom-gradient2 text-white">{children}</main>
      </SidebarProvider>
    </>
  );
}
