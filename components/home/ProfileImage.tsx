import Image from "next/image";
import React from "react";

import { fetchUserProfileImage } from "@/lib/actions/profile/profileActions";
export const ProfileImage = async () => {
  const user = await fetchUserProfileImage();
  if (!user) return null;
  return (
    <div className=" flex-none">
      <Image
        src={user?.profileImage}
        alt={user?.name}
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
};
