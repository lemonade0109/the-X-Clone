import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const EmojiPicker = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="group">
          <div className="w-11 h-11 flex items-center justify-center group-hover:bg-twitter/15 rounded-full">
            <MdOutlineEmojiEmotions className="h-10 w-10 p-2 text-sky-500 group-hover:text-twitter rounded-full cursor-pointer" />
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          className="rounded-sm bg-twitter/20 text-white/70 tracking-normal text-sm px-1 py-0"
        >
          <p>emoji</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EmojiPicker;
