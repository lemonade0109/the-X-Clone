"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { FaRetweet } from "react-icons/fa";

const RetweetIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center justify-center group">
            <div className="flex items-center justify-center group-hover:bg-green-950 rounded-full w-10 h-10">
              <FaRetweet className="w-6 h-6 text-gray-500 group-hover:text-green-500" />
            </div>
            <span className="text-gray-500 group-hover:text-green-500">1k</span>
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          className="rounded-sm bg-white/50 text-white/70 tracking-normal text-sm px-1 py-0"
        >
          <p>Repost</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RetweetIcon;
