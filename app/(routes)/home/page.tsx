import React from "react";

import Feeds from "@/components/home/Feeds";
import TweetsForm from "@/components/home/TweetsForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();
  if (!user?.privateMetadata.hasProfile) {
    redirect("/profile");
  }

  return (
    <section className="flex flex-col w-[50%]">
      <div className="border-b w-full h-16 border-gray-800 bg-black px-4 py-2 sticky top-0 left-0">
        <h1 className="text-2xl mt-2 font-bold">Home</h1>
      </div>

      <div className="flex flex-col w-full">
        <TweetsForm />
        <Feeds />
      </div>
    </section>
  );
}
