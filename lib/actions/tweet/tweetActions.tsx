"use server";

import { getAuthUser } from "@/lib/authUser";
import { uploadImage } from "@/utils/cloudinary";
import prisma from "@/utils/db";
import renderError from "@/utils/error";
import { currentUser } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";

export const createTweetAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const user = await currentUser();

  if (!user) throw new Error("Please login to write a tweet");

  try {
    const tweet = formData.get("tweet") as string;
    const file = formData.get("image") as File;
    // const validateFile = validateWithZodSchema(imageSchema, { image: file });
    let fullPath = "";

    if (file) {
      fullPath = await uploadImage(file);
    }

    await prisma.tweet.create({
      data: {
        authorId: user.id,
        text: tweet,
        image: fullPath ?? " ",
        profileImage: user.imageUrl,
      },
    });

    revalidatePath("/home");
  } catch (error) {
    console.log(error);
    return renderError(error);
  }

  return { message: "Unknown error occurred" };
};

export const fetchTweetAction = async () => {
  const tweets = await prisma.tweet.findMany({
    include: {
      comments: true,
      author: true,
    },
  });

  return tweets;
};

export const deleteTweetAction = async (tweetId: string) => {
  await prisma.tweet.deleteMany({
    where: {
      id: tweetId,
    },
  });
};

export const likeTweetAction = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const user = await getAuthUser();
  if (!user) throw new Error("You must be logged in to like a tweet...");

  try {
    await prisma.tweetLike.create({
      data: {
        tweetId: tweetId,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }

  revalidatePath("/home");
};

export const fetchLikesCountAndCheckIfLiked = async (
  tweetId: string,
  userId: string
) => {
  const likes = await prisma.tweetLike.findMany({
    where: {
      tweetId: tweetId,
    },
    include: {
      user: true,
    },
  });

  const likesCount = likes.length;
  const isLiked = likes.some((like) => like.userId === userId);

  return { likesCount, isLiked };
};

export const unlikeTweetAction = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  try {
    await prisma.tweetLike.deleteMany({
      where: {
        tweetId: tweetId,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }

  revalidatePath("/home");
};

export const createTweetBookmarkAction = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const user = await getAuthUser();
  if (!user) throw new Error("You must be logged in to bookmark a tweet...");

  try {
    await prisma.tweetBookmark.create({
      data: {
        tweetId: tweetId,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }

  revalidatePath("/home");
};

export const fetchTweetBookmarkAction = async (
  tweetId: string,
  userId: string
) => {
  const bookmarks = await prisma.tweetBookmark.findMany({
    where: {
      tweetId: tweetId,
    },
    include: {
      user: true,
    },
  });

  const bookmarked = bookmarks.some((bookmark) => bookmark.userId === userId);

  return bookmarked;
};

export const removeTweetBookmarkAction = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const user = await getAuthUser();
  if (!user) throw new Error("You must be logged in to bookmark a tweet...");

  try {
    await prisma.tweetBookmark.deleteMany({
      where: {
        tweetId: tweetId,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }

  revalidatePath("/home");
};
