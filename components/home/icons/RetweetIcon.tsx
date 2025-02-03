"use client";
import React from "react";
import { FaRetweet } from "react-icons/fa";
import { TooltipContainer } from "@/components/ui/tooltipContainer";

const RetweetIcon = () => {
  return (
    <TooltipContainer content={"Repost"} variant="blackShade">
      <div className="flex items-center justify-center group">
        <div className="flex items-center justify-center group-hover:bg-green-950 rounded-full w-10 h-10">
          <FaRetweet className="w-6 h-6 text-gray-500 group-hover:text-green-500" />
        </div>
        <span className="text-gray-500 group-hover:text-green-500">1k</span>
      </div>
    </TooltipContainer>
  );
};

export default RetweetIcon;
