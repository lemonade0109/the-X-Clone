"use server";

import { getAuthUser } from "@/lib/authUser";
import prisma from "@/utils/db";
import renderError from "@/utils/error";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createUserProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please sign up to create a profile");
    const clerkClientInstance = await clerkClient();

    const username = formData.get("username") as string;
    const day = formData.get("day");
    const month = formData.get("month");
    const year = formData.get("year");
    console.log(user.firstName, user.id, username, day, month, year);

    //REMEMBER TO CHECK IF USERNAME IS ALREADY TAKEN
    await prisma.profile.create({
      data: {
        id: user.id,
        name: user.firstName ?? "",
        userName: username,
        profileImage: user.imageUrl,
        bio: " ",
        location: "lagos, Nigeria",
        website: "",
        dob: new Date(1999, 7 - 1, 25),
      },
    });

    await clerkClientInstance.users.updateUserMetadata(user.id, {
      privateMetadata: { hasProfile: true },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }

  redirect("/home");
};

export const fetchProfileDetails = async (userName: string) => {
  const profile = await prisma.profile.findUnique({
    where: {
      userName: userName,
    },
  });

  return profile;
};

export const fetchUserProfileImage = async () => {
  const user = await getAuthUser();

  const profile = await prisma.profile.findUnique({
    where: {
      id: user.id,
    },
    select: {
      profileImage: true,
      userName: true,
      name: true,
    },
  });
  return profile;
};
