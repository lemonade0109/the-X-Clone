"use client";
import React from "react";
import TrendsBar from "./trendsBar";
import WhoToFollowBar from "./whoToFollowBar";

import SearchBar from "./searchContainer";

const RightSidebar = () => {
  // const [input, setInput] = React.useState("");
  // const router = useRouter();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;
  //   router.push(`/search/${input}`);
  //   setTimeout(() => {
  //     router.refresh();
  //   }, 100);
  // };
  return (
    <section className=" bg-black hidden md:inline justify-center  w-[30%] sticky top-0 h-screen">
      <div className="border-l border-gray-800 h-full">
        <SearchBar />
        {/* <form onSubmit={handleSubmit}> 
        </form> */}
        <div className=" container px-4 space-y-5 ">
          <TrendsBar />
          <WhoToFollowBar />
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
