import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

import Icons from "./Icons";
import {
  fetchLikesCountAndCheckIfLiked,
  fetchTweetBookmarkAction,
} from "@/lib/actions/tweet/tweetActions";
import { getAuthUser } from "@/lib/authUser";

export interface TweetProps {
  tweet: {
    id: string;
    text: string;
    authorId: string;
    image: string | null;
    profileImage: string;
    createdAt: {
      day: number;
      month: number;
      year: number;
    };
    author: {
      id: string;
      name: string;
      userName: string;
      profileImage: string;
      bio: string;
      location: string;
      website: string;
      createdAt: {
        day: number;
        month: number;
        year: number;
      };
      updatedAt: {
        day: number;
        month: number;
        year: number;
      };
      dob: {
        day: number;
        month: number;
        year: number;
      };
    };
  };
  id?: string;
}

const Posts = async ({ tweet }: TweetProps) => {
  const user = await getAuthUser();
  if (!tweet) {
    return (
      <p className="text-gray-500 font-bold text-2xl uppercase">
        Kindly post your first tweet
      </p>
    );
  }

  const { likesCount, isLiked } = await fetchLikesCountAndCheckIfLiked(
    tweet.id,
    user.id
  );

  const isBookmarked = await fetchTweetBookmarkAction(tweet.id, user.id);

  return (
    <div className="flex border-y border-gray-800 w-full p-4 space-x-6">
      <div className="w-14 h-12  rounded-full relative">
        <Image
          src={tweet.author.profileImage}
          alt="profile image"
          fill
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex justify-between ">
          <Link
            href={`/${tweet.author.userName}`}
            // href={`/${tweet.author.userName}`}
            className="flex items-center  space-x-1"
          >
            <h3 className="font-bold text-lg truncate">{tweet.author.name}</h3>
            <p className="text-gray-500 tracking-normal truncate">
              @{tweet.author.userName}
            </p>
          </Link>

          <div className="group">
            <Link
              href={"/#"}
              className="flex items-center justify-center  rounded-full w-10 h-10 group-hover:bg-twitter/30"
            >
              <HiDotsHorizontal className="w-6 h-6 text-white/40 group-hover:text-twitter" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col  justify-center space-y-2">
          <p className="text-lg text-start">{tweet.text}</p>

          <Link
            href={`/${tweet.author.userName}/status/${tweet.id}`}
            className=" w-full h-96 rounded-xl relative"
          >
            <Image
              src={tweet.image!}
              alt={"image posted by the user"}
              fill
              className="rounded-xl"
            />
          </Link>
        </div>

        <Icons
          tweetId={tweet.id}
          likeCount={likesCount}
          isLiked={isLiked}
          isBookmarked={isBookmarked}
        />
      </div>
    </div>
  );
};

export default Posts;
