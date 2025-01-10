import React from "react";
import Image from "next/image";
import { RiMoreLine } from "react-icons/ri";

import { fetchUserProfileImage } from "@/lib/actions/profile/profileActions";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Link from "next/link";
const UserImage = async () => {
  const user = await fetchUserProfileImage();

  if (!user) return null;

  return (
    <div className="flex items-center p-3 w-auto  justify-between  rounded-full  transition-all duration-200 gap-4 hover:bg-white/10">
      <div className="flex gap-3">
        <span className="relative w-10 h-10">
          <Image
            src={user?.profileImage}
            alt={user?.name}
            fill
            className="rounded-full"
          />
        </span>

        <span className="text-white">
          <h1 className="font-bold tracking-wide text-lg">{user?.name}</h1>
          <p className="text-sm text-slate-500">@{user.userName}</p>
        </span>
      </div>

      <Popover>
        <PopoverTrigger>
          <RiMoreLine className="w-7 h-7 mr-4" />
        </PopoverTrigger>

        <PopoverContent className="flex flex-col justify-center space-y-6  shadow-white/20 rounded-[15px] max-w-lg h-40 px-0 ">
          <div className="w-full py-4 px-4 hover:bg-white/10 hover:rounded-t-md">
            <Link href="/login" className="text-lg font-bold ">
              {" "}
              Add an existing account
            </Link>
          </div>

          <div className=" w-full py-4 px-4 hover:bg-white/10 hover:rounded-b-md">
            <Link
              href="/logout"
              className="space-x-2 text-lg font-bold  rounded-lg"
            >
              Log out @{user.userName}
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserImage;
