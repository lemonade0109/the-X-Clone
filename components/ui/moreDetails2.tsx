"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CiCircleMore } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaRegBookmark } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbShoppingCartShare } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";

const MoreDetails2 = ({ user }: { user: string }) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const links2 = [
    {
      icon: LiaClipboardListSolid,
      label: "Lists",
      href: `/${user}/lists`,
    },
    { icon: FaRegBookmark, label: "Bookmark", href: "/bookmarks" },
    { icon: GiTakeMyMoney, label: "Monetization", href: "/#" },
    { icon: TbShoppingCartShare, label: "Ads", href: "/#" },
    {
      icon: IoSettingsOutline,
      label: "Settings and privacy",
      href: "/settings",
    },
  ];

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <div className="flex items-center justify-start space-x-4 py-2 px-6 rounded-3xl w-fit transition-all duration-200  hover:bg-white/10">
          <CiCircleMore className="w-8 h-8" />

          <p className="text-xl tracking-wide font-semibold">More</p>
        </div>
      </PopoverTrigger>

      <PopoverContent
        sticky="always"
        className="flex flex-col items-center justify-between w-[22rem] h-[20rem] rounded-2xl shadow-lg shadow-white/30 "
      >
        <ul className="  w-full h-full space-y-6">
          {links2.map((link) => (
            <li key={link.label}>
              <Link
                onClick={() => setIsPopoverOpen(false)}
                href={link.href}
                className="flex items-center text-2xl font-bold  space-x-3"
              >
                <link.icon className="w-7 h-7" />
                <p>{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MoreDetails2;
