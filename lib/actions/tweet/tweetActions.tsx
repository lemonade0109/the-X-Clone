"use server";

import { getAuthUser } from "@/lib/authUser";
import { uploadImage } from "@/utils/cloudinary";
import prisma from "@/utils/db";
import renderError from "@/utils/error";
import { tweetSchema, validateWithZodSchema } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";

export const createTweetAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const user = await currentUser();

  if (!user) throw new Error("Please login to write a tweet");

  try {
    let imageFileUrl = null;

    const tweet = formData.get("text") as string;
    const validateTweet = validateWithZodSchema(tweetSchema, { tweet });
    const imageFile = formData.get("image") as File | undefined;

    // if (imageFile) {
    //   validatedFile = validateWithZodSchema(imageSchema, {
    //     image: imageFile,
    //   });
    // }

    try {
      if (imageFile && imageFile.size > 0) {
        imageFileUrl = await uploadImage(imageFile);
      }
    } catch (error) {
      console.log("Error uploading image", error);
    }

    await prisma.tweet.create({
      data: {
        authorId: user.id,
        text: validateTweet.tweet,
        image: imageFileUrl,
        profileImage: user.imageUrl,
      },
    });

    revalidatePath("/home");
  } catch (error) {
    console.log(error);
    return renderError({ error: "Tweet was not created" });
  }

  return { message: "Tweet successfully created" };
};

export const fetchTweetsAction = async () => {
  const tweets = await prisma.tweet.findMany({
    include: {
      comments: true,
      author: true,
      bookmark: true,
      likedBy: true,
      retweet: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tweets;
};

export const fetchSearchedTweetsAction = async ({
  searchTerm = "",
}: {
  searchTerm: string;
}) => {
  const searchResults = await prisma.tweet.findMany({
    where: {
      OR: [
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          author: {
            userName: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          text: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return searchResults;
};
export const fetchSingleTweetAction = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      comments: true,
      author: true,
      bookmark: true,
      likedBy: true,
      retweet: true,
    },
  });

  const isLiked = tweet?.likedBy.some((like) => like.userId === userId);
  const isBookmarked = tweet?.bookmark.some(
    (bookmark) => bookmark.userId === userId
  );
  const isRetweeted = tweet?.retweet.some(
    (retweet) => retweet.userId === userId
  );

  const likeCount = tweet?.likedBy.length ?? 0;
  const tweetCommentCount = tweet?.comments.length ?? 0;
  const retweetCount = tweet?.retweet.length ?? 0;

  return {
    tweet,
    isLiked,
    isBookmarked,
    isRetweeted,
    likeCount,
    retweetCount,
    tweetCommentCount,
  };
};

export const deleteTweetAction = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  try {
    await prisma.tweet.delete({
      where: {
        id: tweetId,
        authorId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
  revalidatePath("/home");
};

export const likeTweetAction = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const user = await getAuthUser();
  if (!user) throw new Error("You must be logged in to like a tweet...");

  try {
    await prisma.tweetLike.create({
      data: {
        tweetId: id,
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
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  try {
    await prisma.tweetLike.deleteMany({
      where: {
        tweetId: id,
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
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const user = await getAuthUser();
  if (!user) throw new Error("You must be logged in to bookmark a tweet...");

  try {
    await prisma.tweetBookmark.create({
      data: {
        tweetId: id,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }

  revalidatePath("/home");
};

export const fetchAllBookmarks = async ({
  searchText,
}: {
  searchText?: string;
}) => {
  const bookmarks = await prisma.tweetBookmark.findMany({
    include: {
      author: true,
      tweet: true,
    },
    where: {
      OR: [
        {
          author: {
            name: { contains: searchText, mode: "insensitive" },
            userName: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        },
        {
          tweet: { text: { contains: searchText, mode: "insensitive" } },
        },
      ],
    },
  });

  return bookmarks;
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
      author: true,
    },
  });

  const bookmarked = bookmarks.some((bookmark) => bookmark.userId === userId);

  return bookmarked;
};

export const removeTweetBookmarkAction = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const user = await getAuthUser();
  if (!user) throw new Error("You must be logged in to bookmark a tweet...");

  try {
    await prisma.tweetBookmark.deleteMany({
      where: {
        tweetId: id,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }

  revalidatePath("/home");
};

export const replyTweetAction = async ({
  tweetId,
  userId,
  replyText,
}: {
  tweetId: string;
  userId: string;
  replyText: string;
}) => {
  const user = await getAuthUser();
  if (!user) throw new Error("You must be logged in to reply a tweet...");

  try {
    await prisma.tweetComment.create({
      data: {
        tweetId: tweetId,
        authorId: userId,
        text: replyText,
      },
    });
  } catch (error) {
    console.log(error);
    renderError(error);
  }

  revalidatePath("/home");
};

export const fetchRepliesAction = async ({ tweetId }: { tweetId: string }) => {
  const comments = await prisma.tweetComment.findMany({
    where: {
      tweetId: tweetId,
    },
    include: {
      author: true,
      retweet: true,
      bookmark: true,
      likes: true,
      reply: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const commentCount = comments.length;

  return { comments, commentCount };
};
