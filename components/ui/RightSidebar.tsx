"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";

import TrendsBar from "./TrendsBar";
import WhoToFollowBar from "./WhoToFollowBar";
import { useRouter } from "next/navigation";

const RightSidebar = () => {
  const [input, setInput] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/${input}`);
    setTimeout(() => {
      router.refresh();
    }, 100);
  };
  return (
    <section className=" bg-black hidden md:inline justify-center  w-[30%] ">
      <div className="border-l border-gray-800 h-full">
        <form onSubmit={handleSubmit}>
          <div className="py-4 sticky top-0 bg-black ">
            <div className="group relative px-2">
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
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-neutral-900 text-lg w-full h-full px-20  py-4 outline-none  group-focus-within:border-twitter group-focus-within:border rounded-3xl"
              />
            </div>
          </div>
        </form>
        <div className=" container px-4 space-y-5 ">
          <TrendsBar />
          <WhoToFollowBar />
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
