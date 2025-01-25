"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import { HiDotsHorizontal } from "react-icons/hi";
import { links } from "@/utils/moreLinks";
import DeleteDialog from "./DeleteDialog";
import { TweetProps } from "@/utils/interface";

const MoreDetails = ({ tweet }: TweetProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="group">
          <div className="flex items-center justify-center  rounded-full w-10 h-10 group-hover:bg-twitter/30">
            <HiDotsHorizontal className="w-6 h-6 text-white/40 group-hover:text-twitter" />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={-20}
        sticky="always"
        className="flex flex-col items-center justify-between w-[25rem] h-[30rem] rounded-2xl shadow-lg shadow-white/30 "
      >
        <ul className="  w-full h-full space-y-6">
          <li>
            <DeleteDialog tweet={tweet} />
          </li>

          {links.map((link) => (
            <li key={link.label}>
              <div className="flex items-center text-2xl font-bold  space-x-3">
                <link.icon className="w-7 h-7" />
                <p>{link.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MoreDetails;
