import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { CiSearch, CiMail, CiHome, CiCircleMore } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

import UserImage from "./UserImage";
import { Button } from "./button";
import { fetchUserProfileImage } from "@/lib/actions/profile/profileActions";

const LeftSidebar = async () => {
  const user = await fetchUserProfileImage();

  const NavLinks = [
    { name: "Home", icon: CiHome, href: "/home" },
    { name: "Explore", icon: CiSearch, href: "/explore" },
    {
      name: "Notifications",
      icon: IoIosNotificationsOutline,
      href: "/notifications",
    },
    { name: "Messages", icon: CiMail, href: "/messages" },
    { name: `Profile`, icon: CgProfile, href: `/${user?.userName}` },
    { name: "More", icon: CiCircleMore, href: "/more" },
  ];

  return (
    <section className=" border-r  hidden md:inline w-[20%] h-screen  border-gray-200 dark:border-gray-800 sticky top-0">
      <div className="flex flex-col justify-between h-screen p-3 ">
        <div className="flex flex-col gap-8 ">
          <Link
            href="/home"
            className="flex items-center py-2 px-6 rounded-full w-fit transition-all duration-200 gap-4 hover:bg-white/10"
          >
            <FaXTwitter className="w-10 h-10" />
          </Link>

          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center justify-start space-x-4 py-2 px-6 rounded-3xl w-fit transition-all duration-200  hover:bg-white/10"
            >
              <link.icon className="w-8 h-8" />

              <p className="text-xl tracking-wide font-semibold">{link.name}</p>
            </Link>
          ))}

          <Button className="py-8 mx-6 rounded-full  text-2xl text-black font-bold ">
            Post{" "}
          </Button>
        </div>

        <UserImage />
      </div>
    </section>
  );
};

export default LeftSidebar;
