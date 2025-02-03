"use client";
import React from "react";
import HeaderContainer from "../ui/headerContainer";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import TooltipContainer from "../ui/tooltipContainer";

const BookmarkHeader = () => {
  const router = useRouter();
  return (
    <HeaderContainer>
      <TooltipContainer
        content="Back"
        className="rounded-sm bg-white/50 text-white/70 tracking-normal text-sm px-1 py-0"
      >
        <div
          onClick={() => router.push("/home")}
          className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-white/15"
        >
          <IoMdArrowRoundBack className="w-7 h-7" />
        </div>
      </TooltipContainer>

      <h1 className="text-2xl mt-2 font-bold">Bookmark</h1>
    </HeaderContainer>
  );
};

export default BookmarkHeader;
