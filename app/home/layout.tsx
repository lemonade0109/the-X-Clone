import type { Metadata } from "next";

import "../globals.css";

import LeftSidebar from "@/components/ui/LeftSidebar";

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
  title: {
    template: "%s - X app ",
    default: "Welcome - X app",
  },
  description: "It's happening",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full  flex justify-center items-center  bg-black ">
      <div className="xl:max-w-[70vw]  flex border-4 border-yellow-500 ">
        <LeftSidebar />

        {children}
      </div>
    </div>
  );
}
