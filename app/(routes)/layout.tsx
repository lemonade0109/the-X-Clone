import React from "react";

import LeftSidebar from "@/components/ui/leftSidebar";
import RightSidebar from "@/components/ui/rightSidebar";
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
  modal,
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex justify-center items-center  bg-black ">
      <div className="xl:max-w-[70vw] flex">
        <LeftSidebar />

        <div className="">{modal}</div>
        <div className="w-[48%]">{children}</div>

        <RightSidebar />
      </div>
    </div>
  );
}
