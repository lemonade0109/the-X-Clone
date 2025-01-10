import React from "react";
import { BsSearch } from "react-icons/bs";

import Feeds from "@/components/home/Feeds";
import TweetsForm from "@/components/home/TweetsForm";
import RightSidebar from "@/components/ui/RightSidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();
  if (!user?.privateMetadata.hasProfile) {
    redirect("/profile");
  }

  return (
    <main className="flex flex-col ">
      <div className="border-b w-full border-gray-800 bg-black px-4 py-2 sticky top-0 left-0">
        <div className="flex justify-between">
          <span className="text-2xl  font-bold">Home</span>

          <div className="  group relative px-2  ">
            <label
              htmlFor="searchbox"
              className="absolute top-0 left-0 h-full flex items-center justify-center px-10 "
            >
              <BsSearch className="w-6 h-6 text-gray-500   group-focus-within:text-twitter" />
            </label>

            <input
              id="searchbox"
              type="text"
              placeholder="Search"
              className="bg-neutral-900 text-lg w-full h-full px-20  py-4 outline-none  group-focus-within:border-twitter group-focus-within:border rounded-3xl"
            />
          </div>
        </div>
      </div>

      <section className="flex ">
        <div className="flex flex-col w-full">
          <TweetsForm />
          <Feeds />
        </div>
        <span className="border border-gray-800 h-full"></span>
        <RightSidebar />
      </section>
    </main>
  );
}
