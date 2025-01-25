import React from "react";

import LeftSidebar from "@/components/ui/LeftSidebar";
import RightSidebar from "@/components/ui/RightSidebar";
import { Metadata } from "next";
import "../globals.css";

// import { Toaster } from "@/components/ui/toaster";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Home",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex justify-center items-center  bg-black ">
      <div className="xl:max-w-[70vw] flex">
        <LeftSidebar />

        {children}

        <RightSidebar />
      </div>
    </div>
  );
}
